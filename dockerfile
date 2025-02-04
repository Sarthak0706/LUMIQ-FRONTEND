# Step 1: Use an official Node.js image to build the React app
FROM node:14 AS build

# Step 2: Set the working directory for the React app inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . ./

# Step 6: Build the React app for production (optimized build)
RUN npm run build

# Step 7: Install a simple HTTP server to serve the build (instead of Nginx)
RUN npm install -g serve

# Step 8: Expose the port that the app will run on (3000 in your case)
EXPOSE 3000

# Step 9: Command to run the app using the 'serve' package
CMD ["serve", "-s", "build", "-l", "3000"]
