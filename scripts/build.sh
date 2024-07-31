#!/bin/bash
validate_string() {
  local variable=$1
  local message=$2
  local should_exit=$3

  if [ -z "$variable" ]; then
    echo "===> ERROR: $message!"
    if [ "$should_exit" = true ]; then
      echo "Exiting script..."
      exit 1
    fi
  fi
}

IMAGE_TAG=$1
validate_string "IMAGE_TAG" "IMAGE_TAG not provided. Usage: build.sh <IMAGE_TAG> <REGISTRY_URL>" true
REGISTRY_URL=${2:-"avema0512/fe"}

# Update package version
npm run version:patch

# Update app version in UI
node .\scripts\update-version.js

# Build app
echo "===> Building the app..."
npm run build

if [ $? -ne 0 ]; then
    echo "===> Error: App build failed! Exiting script..."
    exit 1
fi

echo "===> Successfully built app!"

# Build and push docker image
  docker info

  if [ $? -ne 0 ]; then
    echo "===> Error: Docker error! If the app version has been changed, please revert it manually in package.json. Exiting script..."
    exit 1
  fi

  echo "===> Building the Image [$IMAGE_TAG]..."

  docker build -t $IMAGE_TAG .

  echo "===> Successfully built the Image [$IMAGE_TAG]!"

  docker tag $IMAGE_TAG "$REGISTRY_URL:$IMAGE_TAG"

  echo "===> Pushing the Image [$IMAGE_TAG] to Docker Registry [$REGISTRY_URL]..."

  docker push "$REGISTRY_URL:$IMAGE_TAG"

  echo "===> Successfully pushed the Image [$IMAGE_TAG] to Docker [$REGISTRY_URL]!"
