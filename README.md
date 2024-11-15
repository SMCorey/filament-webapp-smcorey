# WebApp Assignment Project - Sprint 1

## Project Overview

This project is a web application with a backend built using Node.js and Express, a SQLite database managed through Prisma, and includes initial routing and authentication functionalities. This sprint involves the setup and scaffolding of the backend, routing, database modeling, and seeding, with a partial implementation of user signup and login features.

---

## Sprint 1 Goals

1. **Backend Scaffolding**:4E3RYJ
   - Set up the Express server and initial project structure.

2. **Routing**:
   - Create routes to manage user sessions and products.
   - **Users Route** (`/users`):
     - **Signup**: Handles `POST` requests at `/users/signup` to register new users.
     - **Login**: Handles `POST` requests at `/users/login` to authenticate users.
     - **Logout**: Handles `POST` requests at `/users/logout` to log out users.
     - **Get User Session**: Handles `GET` requests at `/users/getSession` to retrieve user session information.
   - **Products Route** (`/products`):
     - **Get All Products**: Handles `GET` requests at `/products/all` to retrieve all products.
     - **Get Product by ID**: Handles `GET` requests at `/products/:id` to retrieve a specific product by ID.
     - **Purchase**: Placeholder route for future purchase functionality.

3. **Database Setup with Prisma**:
   - Installed and configure Prisma for SQLite database.
   - Created database models for `Product` and `Customer` with the following schemas:
     - **Product**:
       - `product_id`: Integer, primary key.
       - `name`: String, name of the product.
       - `description`: String, brief description of the product.
       - `cost`: Decimal, product price (e.g., 18.90).
       - `image_filename`: String, filename for the product image.
     - **Customer**:
       - `customer_id`: Integer, primary key.
       - `email`: String, unique email for the customer.
       - `password`: String, encrypted password using bcrypt.
       - `first_name`: String, customer's first name.
       - `last_name`: String, customer's last name.
   - Executed Prisma migration to create database tables for these models.

4. **User Signup**:
   - Implemente a `POST` route at `/users/signup` to handle user registration.
   - Validate input to ensure no fields are blank.
   - Uses `bcrypt` to hash passwords before saving them to the database for security.

5. **User Login (Partial)**:
   - Implemente a `POST` route at `/users/login` for basic user login.
   - Validate email and password fields are not blank.
   - Checks email and password validity:
     - Returns email on successful login.
     - Returns appropriate error codes for login failures (e.g., 404 if not found, 401 for unauthorized access).

6. **Products Data Seeding**:
   - Insert 10 sample products into the products table.
   - Save sample product images in `./public` folder:
     - Filenames follow the format `pic1.jpg`, `pic2.jpg`, etc.
     - Each image was resized to a consistent aspect ratio.

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- SQLite
- BCrypt
- Prisma CLI
- Nodemon
- Express

### Steps

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install dependencies.
3. Configure `.env` file with the SQLite database path.
4. Initialize Prisma with `npx prisma init` and apply the initial migration with `npx prisma migrate dev`.
5. Seed the database.

### Running the Server

- Use `npm start` to start the Express server.


## Testing and Verification

### User Signup
1. Test user registration via `POST /users/signup` with valid data.
2. Confirm that the data is saved in the `Customer` table and the password is hashed.

### User Login
1. Test user login via `POST /users/login` with valid and invalid credentials.
2. Verify response codes for valid and invalid logins.

### Product Routes
1. Test fetching all products via `GET /products/all`.
2. Test fetching a product by ID via `GET /products/:id`.
3. Confirm that product images are accessible in the public folder.

---

## Future Steps

1. Complete the login functionality with session handling.
2. Implement the `purchase` functionality in the products route.
3. Expand error handling and validations across all routes.
4. Explore additional features such as product search and category filtering.

---
