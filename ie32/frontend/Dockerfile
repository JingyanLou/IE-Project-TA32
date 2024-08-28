# Stage 1: Build
FROM node:16-alpine AS build

# Set environment variables
ENV NODE_ENV=production

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies with --legacy-peer-deps flag.
RUN npm install --legacy-peer-deps

# Copy the local code to the container image.
COPY . .

# Build the application with increased memory limit
RUN node --max-old-space-size=1024 node_modules/.bin/react-scripts build

# Stage 2: Runtime
FROM node:16-alpine

# Set environment variables
ENV NODE_ENV=production

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the build output from the previous stage to the current stage.
COPY --from=build /usr/src/app/build /usr/src/app/build

# Install serve to serve the build files
RUN npm install -g serve

# Expose port 443 for HTTPS
EXPOSE 443

# Run the application with HTTPS
CMD ["serve", "-s", "build", "-l", "443", "--ssl-cert", "/usr/src/app/ssl/fullchain.pem", "--ssl-key", "/usr/src/app/ssl/privkey.pem"]
