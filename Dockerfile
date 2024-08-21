# Use the specific Node.js version 20.16.0 runtime as a parent image
FROM node:20.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

ENV port=4000
ENV mongoURL=mongodb+srv://tarun:tarun@test.pkmf0.mongodb.net/the_alter_office
ENV privateKey=jwt123

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port the application will run on
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]