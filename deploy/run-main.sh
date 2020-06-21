#!/bin/bash

cp -R ../../scripts ./scripts
cp ./main.sh ./scripts/main.sh

gcloud compute scp --recurse ./scripts mvp-app:~/scripts
gcloud compute ssh mvp-app --command='sudo chmod 700 -R ./scripts'
gcloud compute ssh mvp-app --command='./scripts/main.sh'

rm -rf ./scripts
