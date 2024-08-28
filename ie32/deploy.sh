#!/bin/bash
# Print debug information
echo "Docker username: $DOCKER_USERNAME"

# Navigate to the home directory of the ubuntu user
cd /home/ubuntu

# Pull the latest Docker images
docker pull $DOCKER_USERNAME/frontendie32:latest
docker pull $DOCKER_USERNAME/backendie32:latest
echo "Images pulled successfully"

# Stop and remove the existing frontend container if it is running
if [ "$(docker ps -q -f name=frontendie32)" ]; then
    docker stop frontendie32
    docker rm frontendie32
    echo "Frontend container stopped and removed"
fi

# Stop and remove the existing backend container if it is running
if [ "$(docker ps -q -f name=backendie32)" ]; then
    docker stop backendie32
    docker rm backendie32
    echo "Backend container stopped and removed"
fi

# Remove old Docker images, only keep the most recent one 
docker image prune -f
echo "Unnecessary images deleted"

# Run the frontend container on port 443 for HTTPS
docker run -d --name frontendie32 -p 443:3000 $DOCKER_USERNAME/frontendie32:latest
if [ $? -eq 0 ]; then
    echo "Frontend deployed successfully on HTTPS (port 443)"
else
    echo "Failed to deploy frontend"
    exit 1
fi

# Run the backend container on port 5000
docker run -d --name backendie32 -p 5000:5000 $DOCKER_USERNAME/backendie32:latest
if [ $? -eq 0 ]; then
    echo "Backend deployed successfully on port 5000"
else
    echo "Failed to deploy backend"
    exit 1
fi

echo "Deployment completed successfully"
