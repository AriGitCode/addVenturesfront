# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
AddVentures
AddVentures is a travel mapping app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It features user authentication and profile creation, allowing users to add, edit, and delete visited places with images and comments, as well as create a wishlist of places to visit in the future.

What the project does
AddVentures allows users to pin and share the places they've visited around the world. They can upload images, leave comments, and organize their travels in a visually appealing way.

Why the project is useful
This app is a beautiful way to log your journeys and share your travel experiences with others. Whether you're a frequent traveler or just starting to explore the world, AddVentures helps you keep track of your adventures and create lasting memories.

Getting Started
To get started with the AddVentures app, follow these steps:

Installation
Clone the repository to your local machine:
bash
Copy code
git clone https://github.com/yourusername/addventures.git
Navigate to the project directory:
bash
Copy code
cd addventures
Install dependencies for both the client and server:
bash
Copy code
cd client
npm install
bash
Copy code
cd ../server
npm install
Set up environment variables:
Create a .env file in the server directory.
Add the following variables to the .env file:
makefile
Copy code
PORT=3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Replace your_mongodb_uri with the URI for your MongoDB database, and your_jwt_secret with a secret key for JWT authentication.
Run the server:
sql
Copy code
npm start
Run the client:
bash
Copy code
cd ../client
npm start
Open your web browser and navigate to http://localhost:3000 to view the app.
Contributing
Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.



This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
