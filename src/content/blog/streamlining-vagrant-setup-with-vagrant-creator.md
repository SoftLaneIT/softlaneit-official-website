---
title: "Streamlining Vagrant Setup with Vagrant Creator: Say Goodbye to Manual Configurations!"
excerpt: "Vagrant Creator is a Python package designed by me to simplify the process of generating Vagrant init files with custom configurations. Whether you're new to Vagrant or a seasoned developer..."
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gg7O6k-9G9DSo86JBs8dCg.png
category: DevOps
date: 2026-03-03
readTime: "3 min read"
author:
  name: Tharindu Jayawardhana
  avatar: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop
tags:
  - Vagrant
  - Python
  - DevOps
  - Automation
---

Streamlining Vagrant Setup with Vagrant Creator: Say Goodbye to Manual Configurations!
======================================================================================

![Background by Freepik](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gg7O6k-9G9DSo86JBs8dCg.png)

🚀 What is Vagrant Creator?
---------------------------

Vagrant Creator is a Python package designed by me to simplify the process of generating Vagrant init files with custom configurations. Whether you’re new to Vagrant or a seasoned developer, this tool aims to streamline the creation of your Vagrant environments by offering an interactive, user-friendly interface.

### **PyPI page:**

[https://pypi.org/project/vagrant-creator/](https://pypi.org/project/vagrant-creator/)

🛠️ Installation
----------------

Getting started with Vagrant Creator is straightforward. Simply install the package using pip:

```
pip install vagrant-creator
```

📝 Usage
--------

Once installed, running `vagrant-creator` will launch an interactive setup to guide you through the configuration of your Vagrant environment. Let's take a closer look at how it works:

Entering Information
--------------------

*   Default Values: Pressing `Enter` will use the default value shown in parentheses.
*   Multiple Inputs: You can add multiple forwarded ports or provisioning commands by following the prompts.

### Forwarded Ports

When prompted to add a forwarded port, enter `y` to add a port or `n` to skip:

*   Guest Port: Enter the guest port number (default: 8080).
*   Host Port: Enter the host port number (default: 8080).
*   Auto Correct: Enable auto-correct (default: true). Enter `t` for true or `f` for false.

### Provisioning Commands

When prompted to add a provisioning command, enter `y` to add a command or `n` to skip:

*   Command: Enter the provisioning command (e.g., `sudo yum install ansible -y`).

Example
-------

Here’s a quick example of the interactive setup:

```
$ vagrant-creator
===================================== Vagrant file generator =====================================
Enter vm box name (default: centos/7): 
Enter CPU (default: 1): 
Enter RAM in MB (default: 1024): 
Enter Machine Name (default: default-machine): 
Enter Host Name (default: localhost): 
Enter IP Address (default: 192.168.33.10): 
Do you want to add a forwarded port? [y (Yes) /n (No)]: y
Enter the guest port number (default: 8080): 
Enter the host port number (default: 8080): 
Enable auto correct? (default: true) [t (True) /f (False)]: t
Do you want to add a provisioning command? [y (Yes) /n (No)]: y
Enter the provisioning command (e.g., 'sudo yum install ansible -y'): sudo apt-get install ansible -y
Do you want to add a provisioning command? [y (Yes) /n (No)]: n
Vagrantfile generated successfully!
```

📄 License
----------

This project is licensed under the MIT License. For more details, check out the LICENSE file.