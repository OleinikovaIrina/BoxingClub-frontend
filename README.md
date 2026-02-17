# BoxingClub Frontend

Frontend application for the BoxingClub membership management system.

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

- Make sure the backend is running on: http://localhost:8081  
- Backend repository: https://github.com/OleinikovaIrina/BoxingClub-backend  
- API base URL is configured for local development


