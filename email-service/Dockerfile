# Use the official Node.js image.
FROM node:18

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install the application dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application (if needed).
# RUN npm run build

# Expose the port the email service runs on (if applicable).
# EXPOSE <port>

# Command to run the application.
CMD ["npm", "run", "start"]