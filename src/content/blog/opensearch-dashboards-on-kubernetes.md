---
title: "Opensearch-dashboards on Kubernetes"
excerpt: "I always wanted to know how monitoring in Kubernetes work. So when looked into several monitoring tools I found that Opensearch by Amazon is a great tool for this. But during this implementation I ran into many issues with fluent-bit."
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SMhErHzYfEoOBWIp07M5HA.jpeg
category: DevOps
date: 2026-03-03
readTime: "5 min read"
author:
  name: Chandula Jayathilake
  avatar: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop
tags:
  - Kubernetes
  - Opensearch
  - Monitoring
  - DevOps
---

Opensearch-dashboards on Kubernetes
===================================

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SMhErHzYfEoOBWIp07M5HA.jpeg)

I always wanted to know how monitoring in Kubernetes work. So when looked into several monitoring tools I found that Opensearch by Amazon is a great tool for this. But during this implementation I ran into many issues with fluent-bit. I used Fluent-bit to ship logs from Kubernetes to Opensearch. The configuration of Fluent-bit was so hard to get right and caused me many troubles. 😑.

I will guide you on how to setup this monitoring tool correctly so that you won’t have to bear the same problems i got into 😉

I am doing this on an Ubuntu EC2. First off we need a Kubernetes cluster to work on. For this I am using a Minikube cluster.

1.  Install kubectl

This is the official documentation [http://kubernetes.io/docs/tasks/tools/install-kubectl-linux/](http://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) , I will add the commands needed below as well:

```
#Download the latest release with the command:  
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  
#Download the kubectl checksum file:
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
#Validate the kubectl binary against the checksum file:
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
``````
#if valid:
kubectl: OK
#If the check fails, sha256 exits with nonzero status and prints output similar to:
kubectl: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
``````
#install kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
#test installation
kubectl version --client
```

2. Install Docker for minikube

I installed docker in which i created the minikube cluster. The link for docker installation is: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

and remember to **add the user to the docker group**

```
sudo usermod -aG docker $USER
#either log out and log back in OR
#run the below command to activate this group membership without needing to fully log out and in
newgrp docker
```

3. Install Minikube

![Minikube installation: https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TpMIdTPd19tzULzzdBeTeg.png)```
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
```

Next start the cluster and see whether it is working

```
minikube start
#if needed more control over resource allocation and installation method
minikube start --driver=docker --cpus=6 --memory=24000mb
#list all pods
kubectl get pods -A
```

4. Install Opensearch

[https://docs.opensearch.org/latest/install-and-configure/install-opensearch/debian/](https://docs.opensearch.org/latest/install-and-configure/install-opensearch/debian/)

```
sudo apt-get update && sudo apt-get -y install lsb-release ca-certificates curl gnupg2
curl -o- https://artifacts.opensearch.org/publickeys/opensearch-release.pgp | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/opensearch-release-keyring
echo "deb [signed-by=/usr/share/keyrings/opensearch-release-keyring] https://artifacts.opensearch.org/releases/bundle/opensearch/3.x/apt stable main" | sudo tee /etc/apt/sources.list.d/opensearch-3.x.list
sudo apt-get update
sudo apt list -a opensearch
```

Final command will list the available opensearch versions, i will proceed with installing the latest version:

```
# For new installations of OpenSearch 2.12 and later, you must define a custom admin password in order to set up a demo security configuration.
# Use one of the following commands to define a custom admin password:
sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> apt-get install opensearch
```

If the installation succeeds, it means APT has validated that the repository metadata was signed with a trusted GPG key.

Lets enable and start opensearch

```
sudo systemctl enable opensearch
sudo systemctl start opensearch
#check status
sudo systemctl status opensearch
```

Next we need to tweak some settings in opensearch:

```

sudo nano /etc/opensearch/opensearch.yml
#add this ----------------------
network.host: 0.0.0.0
discovery.type: single-node
---------------------------------
# then run
sudo systemctl daemon-reload
sudo systemctl enable opensearch
sudo systemctl start opensearch
sudo systemctl status opensearch
#confirm functionality
curl -X GET https://localhost:9200 -u 'admin:<custom-admin-password>' -k
```

5. Install Opensearch dashboard

[https://docs.opensearch.org/latest/install-and-configure/install-dashboards/index/](https://docs.opensearch.org/latest/install-and-configure/install-dashboards/debian/)

```
sudo apt-get update && sudo apt-get -y install lsb-release ca-certificates curl gnupg2
curl -o- https://artifacts.opensearch.org/publickeys/opensearch-release.pgp | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/opensearch-release-keyring
echo "deb [signed-by=/usr/share/keyrings/opensearch-release-keyring] https://artifacts.opensearch.org/releases/bundle/opensearch-dashboards/3.x/apt stable main" | sudo tee /etc/apt/sources.list.d/opensearch-dashboards-3.x.list
sudo apt-get update
#list all versions
sudo apt list -a opensearch-dashboards

``````
#Once complete, enable OpenSearch.
sudo systemctl enable opensearch-dashboards
#Start OpenSearch.
sudo systemctl start opensearch-dashboards
#Verify that OpenSearch launched correctly.
sudo systemctl status opensearch-dashboards
```

Next change these settings in opensearch-dashboard to bind dashboard to any available interface:

```
sudo nano /etc/opensearch-dashboards/opensearch_dashboards.yml
#add this line-----------------
server.host: "0.0.0.0"
-------------------------------
```

You should be able to access the opensearch dashboard at [http://localhost:5601](http://localhost:5601)

or in my case

[http://<EC2-vm-public-ip>:5601](http://localhost:5601)

Use the username and password given during installation:

![captionless image](https://miro.medium.com/v2/resize:fit:922/format:webp/1*VnNMaaM22jF8uO-6Nso-Eg.png)

6. Install Fluent-bit

It is easier to install fluent-bit using helm

```
helm repo add fluent https://fluent.github.io/helm-charts
helm repo update
```

Next add fluent-bit-values.yaml:

This is a general values.yaml file you can use this version 1 or version 2.

```
# version 1
# fluent-bit-values.yaml
config:
  inputs: |
    [INPUT]
        Name              tail
        Path              /var/log/containers/*.log
        Tag               kube.*
        Parser            docker
        Mem_Buf_Limit     5MB
        Refresh_Interval  5
    [INPUT]
        Name              systemd
        Tag               host.*
        Systemd_Filter    _SYSTEMD_UNIT=kubelet.service
        Systemd_Filter    _SYSTEMD_UNIT=docker.service
        Strip_Underscores On
  outputs: |
    [OUTPUT]
        Name              opensearch
        Match             *
        Host              98.84.135.190
        Port              9200
        Index             minikube-logs
        Logstash_Format   On
        tls               On
        tls.verify        Off
        HTTP_User         admin
        HTTP_Passwd       abcABC@123
```

I am using a nginx default site in the kubernetes cluster to get the logs. If you also want to try with nginx try this version 2.

```
# version 2
# fluent-bit-values.yaml - Add Nginx parsing
config:
  service: |
    [SERVICE]
        Log_Level         debug
        Parsers_File      /fluent-bit/etc/parsers.conf
        Parsers_File      /fluent-bit/etc/conf/custom_parsers.conf
        HTTP_Server       On
        HTTP_Listen       0.0.0.0
        HTTP_Port         2020
  inputs: |
    # Tail Kubernetes container logs
    [INPUT]
        Name              tail
        Path              /var/log/containers/*.log
        Tag               kube.*
        Parser            docker
        Mem_Buf_Limit     5MB
        Refresh_Interval  5
    # Tail Nginx access logs
    [INPUT]
        Name              tail
        Path              /var/log/nginx/access.log
        Tag               nginx.access
        Parser            nginx_custom
        Mem_Buf_Limit     5MB
        Refresh_Interval  5
  filters: |
    # Basic filter for debugging - just add a field to track processing
    [FILTER]
        Name              modify
        Match             nginx.*
        Add               processed_by fluent-bit
  outputs: |
    # Output to stdout for debugging first
    [OUTPUT]
        Name              stdout
        Match             nginx.*
        Format            json_lines
    # Also output to OpenSearch
    [OUTPUT]
        Name              opensearch
        Match             nginx.*
        Host              host.minikube.internal
        Port              9200
        Index             nginx
        Logstash_Format   On
        Logstash_Prefix   nginx
        Replace_Dots      On
        TLS               On
        TLS.Verify        Off
        HTTP_User         admin
        HTTP_Passwd       abcABC@123
        Retry_Limit       3
        Suppress_Type_Name On
        Trace_Error       On
        Trace_Output      On
  customParsers: |
    [PARSER]
        Name        nginx_custom
        Format      regex
        Regex       ^(?<remote_addr>[^ ]*) - (?<remote_user>[^ ]*) \[(?<time_local>[^\]]*)\] "(?<method>[A-Z]+) (?<uri>[^ ]*) (?<protocol>[^"]*)" (?<status>[0-9]{3}) (?<body_bytes_sent>[^ ]*) "(?<http_referer>[^"]*)" "(?<http_user_agent>[^"]*)" "(?<http_x_forwarded_for>[^"]*)"
        Time_Key    time_local
        Time_Format %d/%b/%Y:%H:%M:%S %z
```

Upgrade the fluent-bit installation

```
helm upgrade --install fluent-bit fluent/fluent-bit -f fluent-bit-values.yaml
```

7. Install Nginx site on the kubernetes cluster

```
# nginx-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  default.conf: |
    server {
        listen 80;
        location / {
            root /usr/share/nginx/html;
            index index.html;
        }
        location /forbidden {
            return 403;
        }
        location /notfound {
            return 404;
        }
        location /error {
            return 500;
        }
        location /redirect {
            return 302 http://$host/;
        }
    }
``````
# nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:stable
          ports:
            - containerPort: 80
          volumeMounts:
            - name: nginx-config-volume
              mountPath: /etc/nginx/nginx.conf
              subPath: nginx.conf
      volumes:
        - name: nginx-config-volume
          configMap:
            name: nginx-config
            items:
              - key: nginx.conf
                path: nginx.conf
``````
kubectl apply -f nginx-deployment.yaml
```

8. Check logs

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*q4R-OzPv7wtk1_iUgD7rmQ.png)

Here nginx* logs refer to the logs generated by nginx.

These are the pods running in my environment:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LfW7eaPtEv9lUTHOjF-mEw.png)

9. Now its time to configure dashboard to show the logs

```
Create an Index Pattern
1. Go to Management → Index Patterns.
2. Click Create index pattern.
3. Enter the index name used by Fluent Bit, e.g.:nginx*
4. Select the time filter field (usually @timestamp).
5. Save the index pattern.
``````
# Generate traffic with different forwarded IPs to display in dashboard
curl -H "X-Forwarded-For: 192.168.1.100" http://$(minikube ip):30080/
curl -H "X-Forwarded-For: 10.0.0.50" http://$(minikube ip):30080/error
curl -H "X-Forwarded-For: 172.16.0.200" http://$(minikube ip):30080/redirect
curl -H "X-Forwarded-For: 203.0.113.45" http://$(minikube ip):30080/notfound
```![captionless image](https://miro.medium.com/v2/resize:fit:1248/format:webp/1*NjiCDSjd9DQmmvW3D0dZnw.png)

Now your discovery page in opensearch dashboards should look like:
You can learn to create dashboards in their official documentation: [https://docs.opensearch.org/latest/dashboards/dashboard/index/](https://docs.opensearch.org/latest/dashboards/dashboard/index/)

That’s all.
Happy monitoring 😃