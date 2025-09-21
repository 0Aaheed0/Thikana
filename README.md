# Thikana

Thikana is a web application for reporting and tracking missing persons and road accidents. It provides a platform for users to submit reports, view existing cases, and get help from data specialists and organizations.

## Features

- Report missing persons with detailed information and photos.
- Report road accidents.
- View a case archive of all reported incidents.
- Filter and search for specific cases.
- User authentication (signup and login).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Thikana.git
   ```
2. Install NPM packages for the frontend
   ```sh
   npm install
   ```
3. Install NPM packages for the backend
   ```sh
   cd backend/server && npm install
   ```
4. Create a `.env` file in the `backend/server` directory and add the following environment variables:
   ```
   MONGO_URI=<your_mongo_db_uri>
   PORT=5000
   JWT_SECRET=<your_jwt_secret>
   ```

### Running the Application

1. Start the application
   ```sh
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Built With

- [React](https://reactjs.org/) - The web framework used.
- [Node.js](https://nodejs.org/) - The backend runtime environment.
- [Express](https://expressjs.com/) - The backend framework used.
- [MongoDB](https://www.mongodb.com/) - The database used.
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data`.