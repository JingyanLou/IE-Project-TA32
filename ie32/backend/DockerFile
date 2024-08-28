# Use the official Node.js 16 image with Alpine base for a smaller image size.
FROM node:16-alpine

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container.
COPY package*.json ./

# Install the application dependencies.
RUN npm install

# Copy the entire project directory to the container.
COPY . .

# Clean up npm cache to reduce image size.
RUN npm cache clean --force

# Expose the port the app runs on.
EXPOSE 5000

# Command to run the application
CMD ["node", "src/server.js"]
