#!/bin/bash

sudo apt-get update -y

./scripts/setup-swap.sh

./scripts/install-stackdriver-monitoring.sh

./scripts/install-docker.sh

# ./scripts/install-nginx.sh

# sudo mv nginx.conf /etc/nginx/

# sudo nginx
