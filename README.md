# BoxingClub Frontend

Frontend application for the BoxingClub membership management system.

##  Demo

You can explore the application without registration using pre-created demo accounts:

- **User:** user@test.com / Password@1  
- **Admin:** admin@test.com / Password@2  

Demo flow:
1. Login as User → create a membership request  
2. Login as Admin → review and approve/reject requests  


## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Formik + Yup

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

## Email Handling

Password reset emails are handled via **Mailtrap (testing environment)**.  
Emails are not sent to real inboxes.

## Backend

This application works together with the backend service:

https://github.com/OleinikovaIrina/BoxingClub-backend

Make sure the backend is running before starting the frontend.

Default backend URL: http://localhost:8081

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


