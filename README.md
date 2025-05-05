# Express.js Authentication System with MongoDB and Sessions

This project is a Node.js + Express.js backend application that demonstrates:
- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Express routing and middleware
- Cookies and sessions
- Authentication using Passport.js
- Password hashing with bcrypt
- Session storage in MongoDB
- Mongoose schemas and models

---

## 📚 What I’ve Learned

### ✅ Core Concepts

- **Express.js**: Node.js web framework for handling routes and middleware.
- **Request & Response**: Objects containing data from the client and response from the server.
- **Middleware**: Functions that run between request and response (e.g., authentication, logging).
- **Routes**: Endpoints like `/api/users` or `/api/products` to organize code.
- **HTTP is Stateless**: Server doesn’t remember clients without cookies/sessions.
- **Client & Server Side**: Client = browser; Server = backend handling logic/data.
- **Cookies**: Stored in browser to identify users; server sends it back with response.
- **Signed Cookies**: Cookies that are cryptographically signed for tamper protection.
- **Sessions**: Stores user data on server (with cookie to track session ID).
- **Session Store**: Stores sessions in a DB like MongoDB for persistence.
- **Passport.js**: Middleware for login authentication using strategies like local.
- **Serializing/Deserializing Users**:
  - Serialize: Store user info in session when they log in.
  - Deserialize: Retrieve user from session on future requests.
- **MongoDB + Mongoose**:
  - Define schemas (`userSchema`)
  - Create models using `mongoose.model`
- **Hashing Passwords**:
  - Use `bcrypt.hashSync` or `bcrypt.hash`
  - Salt = Random data added to hash
  - SaltRounds = Number of processing rounds for stronger security

---

## 🔧 Packages to Install

```bash
npm install express mongoose dotenv
npm install express-session connect-mongo
npm install passport passport-local
npm install bcrypt
npm install cookie-parser
npm install passport passport-local
