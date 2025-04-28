# Setup Guide

This guide provides step-by-step instructions for setting up the authentication template application on your local machine.

## Prerequisites

Before you begin, you'll need to install the following software:

1. Node.js and npm (Node Package Manager)
2. MongoDB Community Edition
3. A code editor (e.g., VS Code, Webstorm, etc.)
4. Git 

## Step 1: Install Node.js and npm

Node.js is the JavaScript runtime that powers the server-side of this application. npm is the package manager that comes with Node.js and helps you install dependencies.

### For Windows:

1. Download the installer from [Node.js official website](https://nodejs.org/)
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the installation wizard
4. Verify installation by opening Command Prompt and typing:
   ```
   node --version
   npm --version
   ```

### For macOS:

Option 1: Using Homebrew (recommended):
```
brew install node
```

Option 2: Using the installer:
1. Download the installer from [Node.js official website](https://nodejs.org/)
2. Choose the LTS version
3. Run the installer and follow the instructions
4. Verify installation in Terminal:
   ```
   node --version
   npm --version
   ```

### For Linux (Ubuntu/Debian):

```
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

## Step 2: Set Up MongoDB

MongoDB is the database used by this application to store user information.

### Recommended: MongoDB Atlas (Cloud Database)

For beginners, using MongoDB Atlas (cloud-hosted MongoDB) is often easier than setting up a local MongoDB server:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient)
3. Under "Database Access," create a database user with read/write privileges
4. Under "Network Access," add your IP address or use 0.0.0.0/0 for development
5. Under "Databases," click "Connect" on your cluster
6. Choose "Connect your application"
7. Select Node.js as the driver
8. Copy the connection string (you'll use this in the .env file later)

### Alternative: Install MongoDB Community Edition Locally

### For Windows:

1. Download the MongoDB Community Server installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation
4. Install MongoDB as a service (recommended)
5. Create the data directory if prompted
6. After installation, MongoDB should start automatically as a Windows service

### For macOS:

Option 1: Using MongoDB.app (recommended):
1. Download MongoDB Community Server .tgz from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Extract the files and move to a location of your choice
3. Create a data directory:
   ```
   mkdir -p ~/data/db
   ```
4. Start MongoDB from the bin directory:
   ```
   cd /path/to/mongodb/bin
   ./mongod --dbpath ~/data/db
   ```

Option 2: Using Homebrew and MongoDB Database Tools:
```
brew tap mongodb/brew
brew install mongodb-database-tools
```

Option 3: Using MongoDB Compass (GUI):
```
brew install --cask mongodb-compass
```
Note: With MongoDB Compass, you'll need to set up a connection (including MongoDB Atlas as a cloud option).

### For Linux (Ubuntu/Debian):

```
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

Verify MongoDB installation by connecting to it:
```
mongo
```

You should see the MongoDB shell open. Type `exit` to close it.

## Step 3: Clone or Download the Template

If you're using Git:
```
git clone <repository-url>
cd assignment-5
```

Alternatively, download the ZIP file of the project and extract it to a location of your choice.

## Step 4: Install Project Dependencies

In the project directory, run:
```
npm install
```

This will install all the required dependencies specified in package.json.

## Step 5: Set Up Environment Variables

Create a `.env` file in the root directory of the project:
```
cp .env.example .env
```

Or manually create a file named `.env` in the project root directory with the following content:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/auth_template
SESSION_SECRET=your_secure_random_string_here
```

Notes:
- `PORT`: The port on which the application will run (default: 3000)
- `NODE_ENV`: The environment (development, production, etc.)
- `MONGODB_URI`: The URI to connect to your MongoDB database
  - For local MongoDB: `mongodb://localhost:27017/auth_template`
  - For MongoDB Atlas: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth_template?retryWrites=true&w=majority`
- `SESSION_SECRET`: A random string used to sign the session ID cookie (for security)

For the `SESSION_SECRET`, you should use a long, random string. You can generate one by running this in the terminal:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: Start MongoDB

Ensure MongoDB is running:

### For Windows:
MongoDB should already be running as a service if you installed it with the installer. If not, you can start it manually:
```
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe" --dbpath="C:\data\db"
```

### For macOS:
If using the downloaded MongoDB Community Server:
```
cd /path/to/mongodb/bin
./mongod --dbpath ~/data/db
```

If using MongoDB Compass:
1. Open MongoDB Compass
2. Set up a connection to a local or cloud MongoDB instance

### For Linux:
```
sudo systemctl start mongodb
```

## Step 7: Start the Application

In the project directory, run:
```
npm run dev
```

This will start the application in development mode with nodemon, which automatically restarts the server when you make changes to the code.

## Step 8: Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the home page of the authentication template.

## Troubleshooting

### MongoDB Connection Issues

If you encounter issues connecting to MongoDB:
1. Ensure MongoDB is running
2. Check your MongoDB URI in the `.env` file
3. Verify that the MongoDB port (default: 27017) is not blocked by firewall
4. For MongoDB Atlas (cloud-hosted option), ensure your IP address is whitelisted

### Node.js/npm Issues

If you encounter issues with Node.js or npm:
1. Ensure you have the correct version of Node.js installed (12.x or higher recommended)
2. Try deleting the `node_modules` folder and running `npm install` again
3. Clear npm cache with `npm cache clean --force`

### Port Already in Use

If port 3000 is already in use:
1. Change the PORT in your `.env` file to another value (e.g., 3001, 8080)
2. Restart the application

## MongoDB Connection Testing

To verify your MongoDB connection is working correctly:

1. Start the application with `npm run dev`
2. Check the console logs for the message "MongoDB connected successfully"
3. If you encounter connection errors, double-check your MONGODB_URI value
   - For MongoDB Atlas, ensure you've replaced `<username>` and `<password>` with your actual credentials
   - For local MongoDB, ensure the MongoDB service is running and the port is correct
4. Try accessing the application in your browser to confirm everything is working

## Next Steps

After setting up the application, you can:

1. Register a new user account
2. Log in with the created account
3. Explore the protected routes
4. Start building your own features on top of this authentication template
5. Modify the styling to match your application's design

For more information about the template features and how to extend them, refer to the TEMPLATE-README.md file.