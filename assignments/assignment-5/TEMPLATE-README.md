# User Authentication Template

A complete web application template with user authentication features built with Express.js, MongoDB, and vanilla JavaScript. This template serves as a foundation for students to build upon in their web development projects.

## Features

- User registration and login system
- Secure password hashing with bcrypt
- Session management with express-session
- Protected routes that require authentication
- CSRF protection
- Form validation with express-validator
- Responsive UI with clean CSS (no frameworks)
- MVC architecture pattern with EJS templating
- MongoDB database integration

## Project Structure

```
.
├── app.js                 # Application entry point
├── controllers/           # Route controllers
│   ├── authController.js  # Authentication logic
│   └── userController.js  # User-related logic
├── middlewares/           # Custom middleware
│   ├── auth.js            # Authentication middleware
│   ├── error-handler.js   # Error handling middleware
│   └── locals.js          # Template locals middleware
├── models/                # Database models
│   └── User.js            # User model with password hashing
├── public/                # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── routes/                # Express routes
│   ├── auth.js            # Authentication routes
│   ├── index.js           # Public routes
│   └── user.js            # Protected user routes
└── views/                 # EJS templates
    ├── partials/          # Reusable template parts (header, footer, etc.)
    ├── auth/              # Authentication templates
    └── user/              # User-related templates
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-authentication-template
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   cp .env.example .env
   ```

4. Modify the `.env` file with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/auth_template
   SESSION_SECRET=your_secure_secret_key
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000`

## Educational Components

This template includes detailed comments throughout the codebase to explain:

- Authentication flow and best practices
- Password hashing implementation
- Session management
- Middleware usage
- Security considerations
- Form validation
- Database interactions

## Security Features

- Passwords are hashed using bcrypt
- CSRF protection for all forms
- HTTP-only session cookies
- Input validation and sanitization
- Secure session configuration
- Protection against common web vulnerabilities

## Development

### Running in Development Mode

```
npm run dev
```

This will start the server with nodemon, which automatically restarts when files change.

### Running in Production Mode

```
npm start
```

## Deployment

For a production environment:

1. Set NODE_ENV to 'production' in your .env file
2. Ensure you have a proper MongoDB URI for production
3. Generate a strong SESSION_SECRET value
4. Consider using a process manager like PM2
5. Set up proper error logging

## License

This project is available for educational purposes.

## Acknowledgments

- This template was created as a learning resource for web development students
- Built with Express.js, MongoDB, and other open-source technologies