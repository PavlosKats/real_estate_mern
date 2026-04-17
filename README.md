# Real Estate MERN Project

## Overview
This is a full-stack real estate application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The project is designed to provide a platform for users to browse, list, and manage real estate properties.

## Features
### Backend
- User authentication (Sign Up, Sign In, JWT-based authorization)
- Role-based access control
- RESTful API for managing users and properties
- Error handling and validation

### Frontend
- Responsive design with Tailwind CSS
- User-friendly interface for browsing and managing properties
- Firebase integration for additional services
- State management using Redux

## Project Structure
```
real_estate_mern/
├── api/                # Backend code
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
├── client/             # Frontend code
│   ├── src/            # React application source
│   ├── components/     # Reusable components
│   ├── pages/          # Application pages
│   ├── redux/          # Redux store and slices
```

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Firebase project setup

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real_estate_mern.git
   ```
2. Navigate to the project directory:
   ```bash
   cd real_estate_mern
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   # Backend
   cd api
   npm install

   # Frontend
   cd ../client
   npm install
   ```

## Usage
1. Start the backend server:
   ```bash
   cd api
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

## Configuration
### Backend
- Create a `.env` file in the `api` directory with the following variables:
  ```env
  MONGO_URI=your-mongodb-connection-string
  JWT_SECRET=your-jwt-secret
  ```

### Frontend
- Update the `firebase.js` file in the `client/src` directory with your Firebase configuration.

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase, JWT

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Contact
For any inquiries, please contact [your-email@example.com].