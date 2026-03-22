# BoxingClub Frontend

A full-stack membership management application for a boxing club.
Includes authentication, role-based access, and real-world user flows.
Production-ready demo deployed on Render.

## 🚀 Live Demo

https://boxingclub-frontend.onrender.com


## Demo Access

You can explore the application without registration:
👉 No registration required — use demo accounts above.

**User Account**
- Email: user@test.com  
- Password: Password@1  

**Admin Account**
- Email: admin@test.com  
- Password: Password@2  

**Try this flow:**
1. Login as User → create a membership request  
2. Login as Admin → approve or reject it  

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Formik + Yup
- JWT Authentication
- REST API integration
- External AI API integration (Groq)

## Architecture

- REST API (Spring Boot backend)
- JWT-based authentication (stateless)
- Role-based access control (USER / ADMIN)
- Layered architecture (Controller → Service → Repository)

## Features

### Authentication
- User registration
- Login with JWT
- Role-based navigation (USER / ADMIN)

### Membership Management
- Create membership
- View personal memberships
- Admin view for pending memberships
- Approve / reject memberships

### Password Reset
- Request password reset via email
- Token validation
- Set new password

## Security

- JWT authentication (stateless)
- Protected API endpoints
- Role-based authorization
- Password reset via secure token

## Email Handling

Password reset emails are handled via **Mailtrap (testing environment)**.  
Emails are not sent to real inboxes.

## AI Integration

The application integrates with an external AI service (Groq API) to provide additional functionality.

- Sends user requests to an LLM API
- Processes AI-generated responses
- Demonstrates real-world API integration with external services

## Backend

This frontend is connected to a deployed backend service:

👉 https://github.com/OleinikovaIrina/BoxingClub-backend

The backend provides:
- REST API
- Authentication & authorization (JWT)
- Database persistence

## Installation

```bash
npm install
npm run dev
```
Application runs by default on: http://localhost:5173

## Notes

- Demo accounts are pre-created for testing 
- API base URL is configured for local development
- For production deployment, configure VITE_API_URL accordingly.


