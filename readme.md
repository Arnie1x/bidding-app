# Bidding Application

This is a full-stack bidding application where admins can add products, and users can place bids. The application ensures secure authentication using JWT and includes a React-based frontend and a FastAPI backend.

---

## Features

- Admins can add products for bidding.
- Users can place bids, with the highest bid highlighted after the bidding ends.
- Bids can only be placed if they are higher than the current bid.
- Bids cannot be placed after the bidding end time.
- Authentication is handled using JWT for secure access.

---

## Tech Stack

### Frontend

- **React** with **Vite** for a fast and modern web experience.
- Environment variables stored in `/frontend/.env`.

### Backend

- **FastAPI** for API services.
- **SQLAlchemy** for database ORM.
- **MySQL** as the database.
- Environment variables stored in `/backend/.env`.

---

## Installation Instructions

### Prerequisites

Make sure the following are installed on your system:

- **Node.js** (v16 or later)
- **npm**
- **Python** (v3.9 or later)
- **MySQL** database server

---

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Set up a virtual environment:

   ```bash
   python3 -m venv venv
   ```

3. Activate the virtual environment:
    - Windows:

      ```bash
      venv\Scripts\activate
      ```

    - Linux/Mac:

        ```bash
        source venv/bin/activate`
        ```

4. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Configure environment variables::
    - Create a .env file in the /backend folder based on the `env.example` provided.
    - Add the necessary configuration values (e.g., database connection URL, JWT secret).
6. Create the Database:
    - Create the Database in MySQL e.g. Bidding
7. Run the backend server:

    ```bash
    uvicorn main:app --reload
    or
    python3 app.py
    ```

### Frontend Setup (Not Yet Developed)

**Note:** This is a placeholder for when the frontend is developed.

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:
    - Create a .env file in the /frontend folder based on the `env.example` provided.
    - Add the necessary configuration values (e.g., backend URL).
4. Start the frontend server:

    ```bash
    npm run dev
    ```

The frontend will start running at <http://localhost:5173> by default.

## Backend API Endpoints

### Authentication

- POST /token - Authenticate users and return a JWT token.
- POST /signup - Sign up new users.
- POST /add-admin - Add a new admin (admin-only route).

### Product Management

- POST /add-product - Add a new product for bidding (admin-only route).
- GET /products - Retrieve all products.
- GET /product/{product_id} - Retrieve details of a specific product.
- DELETE /product/{product_id} - Delete a product (admin-only route).

### Bidding

- POST /product/{product_id}/bid - Place a bid on a product.

## Database Configuration

- The application uses a MySQL database. Ensure your database is running and configured properly.
- The connection URL should be set in the `/backend/.env` file, using the format:

    ```bash
    DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database_name>
    ```

- Replace `<user>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with appropriate values.

## Future Development

**Frontend Development:** The React-based frontend is under development and will include user-friendly interfaces for bidding and product management.
