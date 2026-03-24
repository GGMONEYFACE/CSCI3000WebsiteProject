# CKAF Login POC

Proof of Concept for Role-Based Access Control (RBAC) system.

## Features

- User registration and login
- Role-based permissions (Member, Instructor, Admin)
- Admin dashboard for user management
- Secure password hashing with bcrypt
- Session-based authentication
- Responsive design

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env` if needed

3. **Start the server:**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

4. **Access the application:**
   - Open http://localhost:3001
   - Sign up for a new account
   - First user automatically becomes admin

## User Roles

- **Member**: Basic access
- **Instructor**: Access to teaching materials
- **Admin**: Full access + user management

## Security Features

- Password hashing with bcrypt (12 rounds)
- Session-based authentication
- Rate limiting
- Helmet for security headers
- Input validation and sanitization

## API Endpoints

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /admin/users` - List all users (admin only)
- `POST /admin/users/:id/role` - Update user role (admin only)
- `POST /admin/users/:id/toggle` - Toggle user active status (admin only)
- `DELETE /admin/users/:id` - Delete user (admin only)

## Future Enhancements

- Email verification
- Password reset
- Audit logging
- Two-factor authentication
- File upload for user profiles