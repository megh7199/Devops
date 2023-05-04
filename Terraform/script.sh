#! /bin/bash
sudo apt-get update
echo "hello from script file" 
sudo apt install nginx -y
sudo systemctl start nginx  
sudo systemctl status nginx
