# SysCommerce

## Overview
This project is a full-stack web application designed for managing products, categories, and user roles with distinct access levels. It includes functionalities for users, admins, and super admins, with secure authentication and authorization mechanisms.

## Live demo
[Demo](https://syscommerce.netlify.app/)

## Features

### User
- Perform CRUDS (Create, Read, Update, Delete) operations on products.
- Add, view, and remove items from the wishlist.

### Admin
- View and delete user accounts.
- View and delete products.
- Perform CRUDS operations on categories.

### Super Admin
- Manage admin accounts with full CRUDS capabilities.
- View and delete products.
- Perform CRUDS operations on categories.
- View and delete user accounts.

**Note:** A Super Admin account is initialized automatically when the server starts.

## Security

### Session Management
- Sessions are managed using `cookie-parser`, with JWT tokens stored in cookies for user authentication.

### Password Security
- Passwords are hashed using the `bcrypt` library to enhance security.

### Email Verification
- Email verification is implemented using the `nodemailer` library to send confirmation emails to users.

### Data Validation
- Data validation is handled by the `yup` library on both the frontend and backend.

## ERD
![ERD](https://drive.google.com/uc?export=view&id=1rxh7-thWvekmOD-j3CR4AKlxy3KRjYRc)

## Technologies Used
- **ExpressJs** - as the backend framework to handle routing and server logic.
- **MongoDB** - for managing user, product, and category data.
- **cookie-parser** - for handling cookies in Express.
- **bcryptjs** - for hashing passwords.
- **nodemailer** - for sending emails to users.
- **yup** - for schema-based validation of request data.

