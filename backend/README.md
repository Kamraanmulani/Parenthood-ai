# BharatGen Backend

This is the backend server for the BharatGen application.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bharatgen
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Start MongoDB:
Make sure MongoDB is installed and running on your system.

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

- POST `/api/auth/signup`
  - Body: `{ username, email, password }`
  - Response: `{ token, user: { id, username, email } }`

- POST `/api/auth/login`
  - Body: `{ email, password }`
  - Response: `{ token, user: { id, username, email } }`

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for frontend communication 