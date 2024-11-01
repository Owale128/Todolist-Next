# The baseimage for node
FROM node:18

# Work directory
WORKDIR /app

# Copy package files and dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install ts-node globally in container
RUN npm install -g ts-node

# Copy the rest of the code
COPY . .

# Port
EXPOSE 3000
