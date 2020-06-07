#!/bin/bash

docker run --name mvp-app -v ~/Code/mvp/mvp-app/scripts/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
