# Authentication-using-Google-Cloud
Google Cloud Authentication using Passport


Google Authentication with Passport.js
This project demonstrates Google authentication (Gmail login) using Passport.js and Google OAuth2.0. It allows users to log in with their Google account and gain access to the application.
Google OAuth Login: Users can log in with their Google account using Passport.js and Google OAuth 2.0.
Session Management: Once authenticated, user data is saved in a session for persistent login.

Technologies Used
Node.js: JavaScript runtime for server-side logic.
Express.js: Web application framework for Node.js.
Passport.js: Middleware for handling authentication.
Google OAuth2.0: For authenticating users via Google accounts (Gmail).
Express-Session: To maintain sessions for logged-in users.

Prerequisites
Google Cloud Project: You’ll need to create a project on Google Cloud Console and set up OAuth2.0 credentials.

Routes
/auth/google: Redirects the user to Google’s login page.
/auth/google/callback: Handles the callback from Google after successful login.
/logout: Logs out the user and redirects to the homepage.
