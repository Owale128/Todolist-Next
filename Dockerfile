# The baseimage for node
FROM node:18

# Work directory
WORKDIR / APP

# Copy package files and dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Port
EXPOSE 3000
