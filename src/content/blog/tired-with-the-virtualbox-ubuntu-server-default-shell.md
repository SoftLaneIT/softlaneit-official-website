---
title: Tired with the VirtualBox Ubuntu Server default shell?
excerpt: After a long day of coding, you just want to tinker around and run a few experiments on your own terms. So, you spin up a fresh Ubuntu Server on a VirtualBox VM.
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*B-Ygh7QpZAo8hAqL3xAVpA.png
category: Tutorials
date: 2026-03-03
readTime: 4 min read
author:
  name: Tharindu Jayawardhana
  avatar: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop
tags:
  - VirtualBox
  - Ubuntu
  - SSH
  - Tutorial
---

Tired with the VirtualBox Ubuntu Server default shell?
======================================================

![SSH into server](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*B-Ygh7QpZAo8hAqL3xAVpA.png)

After a long day of coding, 🥲you just want to tinker around and run a few experiments on your own terms.😉 So, you spin up a fresh Ubuntu Server on a VirtualBox VM. Everything looks good so far…

The machine boots up, Ubuntu installs successfully, and you’re greeted with the default shell. You enter your username and password — voilà! Your server is up and running. 😊

Excited, you begin your experiments. You find some interesting packages to install, copy the commands from your browser, and try to paste them into the VirtualBox shell… but nothing happens. That’s when you realize: the default VirtualBox terminal for headless servers doesn’t support clipboard sharing. Great. 😑

Still, you’re determined. “It’s just a few commands,” you think, and manually type them in. The installation runs and produces a long log. You want to scroll up and review how it started — but the shell doesn’t even let you scroll. You get frustrated.😒 Your motivation fades. You abandon your experiment.

So how can you avoid this pain? 🤔

**Simple.**
SSH into your server from your favorite terminal. 😁

Here’s how to do it… 😏

```
sudo apt update
sudo apt install openssh-server -y
``````
sudo systemctl start ssh
sudo systemctl enable ssh
```

Also do this to permit root login:

```
sudo nano /etc/ssh/sshd_config
```

Ensure the following line is present and **not commented**: “PermitRootLogin yes”

```
sudo systemctl restart ssh
```

Next you need to change the network settings in your virtual box 😊

1.  Go to **VirtualBox > Your VM > Settings > Network**.
2.  Adapter 1 → Attached to: **NAT**
3.  Click **Advanced > Port Forwarding**.
4.  Add a rule like:

```
Name   Protocol     Host IP     Host Port     Guest IP     Guest Port
SSH     TCP                      2222                        22
```

This forwards host port 2222 to VM’s port 22.

Finally, SSH to your server from your favorite terminal 😁

```
ssh username@localhost -p 2222
```