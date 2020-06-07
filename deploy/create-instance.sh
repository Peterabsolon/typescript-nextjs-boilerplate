#!/bin/bash

gcloud compute instances create "mvp-app" \
    --image "ubuntu-1804-bionic-v20200529" \
    --image-project "ubuntu-os-cloud" \
    --machine-type "f1-micro" \
    --zone "europe-west3-a" \
    --boot-disk-size "20" \
    --boot-disk-type "pd-standard" \
    --maintenance-policy "TERMINATE" \
    --network "public" \
    --metadata=enable-oslogin="TRUE" \
    --no-service-account --no-scopes \
    --tags "app"

gcloud compute instances add-iam-policy-binding mvp-app \
    --zone europe-west3-a \
    --member serviceAccount:ssh-master-account@mvp-api-254102.iam.gserviceaccount.com \
    --role roles/compute.osAdminLogin
