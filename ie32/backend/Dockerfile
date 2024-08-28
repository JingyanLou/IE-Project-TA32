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

# Copy SSL certificates into the container.
COPY ssl/privkey.pem /etc/letsencrypt/live/ta32.me/privkey.pem
COPY ssl/fullchain.pem /etc/letsencrypt/live/ta32.me/fullchain.pem

# Clean up npm cache to reduce image size.
RUN npm cache clean --force

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port the app runs on.
EXPOSE 5000

# Command to run the application
CMD ["node", "src/server.js"]
