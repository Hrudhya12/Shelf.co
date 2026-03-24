# Shelf.co
Shelf.co is a simple full‑stack web application.
It includes a Node.js + Express backend, a MongoDB database, and a static HTML/CSS/JS frontend.
The backend is fully containerized using Docker, while the frontend runs directly in the browser.

# Features
Frontend
-	Static HTML/CSS/JS interface
- Pages include:
    -	Home
    -	Products
    -	Product Details
    -	Add Product
    -	Login
    -	Register
    -	Order
    -	Payment Success
-	Fetches data from backend API
-	Displays products dynamically

# Backend
- Node.js + Express server
- REST API for:
      - Fetching all products
      - Adding new products
      - Fetching product details
- MongoDB database connection
- Fully containerized using Docker

# Structure
Shelf.co

 backend
    server.js
    Dockerfile
    package.json
    package-lock.json
    api-test.http
    .gitignore
frontend/
    index.html
    products.html
    details.html
    addpro.html
    login.html
    register.html
    order.html
    payment-success.html

# Running the Backend (Docker)
1. Build the Docker image
  docker build -t shelf-backend .

3. Run the container
   docker run -p 3000:3000 shelf-backend

4. Backend will be available at
   http://localhost:3000
   
# Running the Frontend
The frontend is static — no server or npm required.
Just open:
frontend/index.html

The frontend automatically communicates with the backend at:
http://localhost:3000

# Environment Variables
Create a .env file inside the backend folder (not  included in GitHub):
MONGO_URI=your_mongodb_connection_string

API Endpoints
  GET /products
  Returns all products.
  POST /products
  Adds a new product.
  GET /products/:id
  Returns details for a specific product.

# Testing
- Backend tested using browser + Postman
- API communication verified
- Docker container tested and working
- Frontend tested manually

# Notes
- node_modules and .env are excluded using .gitignore
- Backend is fully containerized; frontend is static


