#!/bin/bash

DOCKER_USER="vathanaksol"

echo "Enter Local Image: "
read LOCAL_IMAGE

echo "Enter Tag: "
read TAG

FULL_IMAGE="$DOCKER_USER/$LOCAL_IMAGE:$TAG"

docker build -t $LOCAL_IMAGE .

docker tag $LOCAL_IMAGE $FULL_IMAGE

docker push $FULL_NAME

echo "Done"
