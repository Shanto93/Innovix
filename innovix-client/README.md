# INNOVIX - Mobile Shop Website

## Live Demo
[Visit INNOVIX](https://innovix-99e1f.web.app/)

---

## Project Overview

**INNOVIX** is a mobile shop e-commerce website built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It is designed to provide an exceptional online shopping experience with secure authentication, role-based authorization, and dynamic features for buyers, sellers, and admins.

This project is a small-scale e-commerce application, demonstrating proficiency in building a responsive and feature-rich web application with backend and frontend integration.

---

## Features

### Authentication & Authorization
- **Firebase Authentication** for secure login and registration.
- **Password Validation** ensuring strong security:
- **Social Login** using Google Authentication.
- **JWT-Based Authorization** for protected API routes and role-based access control.

### User Roles
1. **Buyer**:
   - Browse and purchase products.
   - Manage wishlist and cart.
2. **Seller**:
   - Add, edit, and manage their own products.
   - View all listed products in a personalized dashboard.
3. **Admin**:
   - Manage users (promote, demote, delete users).
   - Promote buyers to sellers.
   - Full control over the application’s data.

### Application Pages
1. **Home Page**:
   - Hero section.
   - Featured products.
   - Testimonials.
   - Categories.
   - FAQs.
   - Contact information.
2. **Products Page**:
   - Product listings with:
     - Search functionality.
     - Sorting (price: ascending/descending).
     - Filtering by category and brand.
   - Detailed product page for each item.
3. **About Page**: Overview of the business and website.
4. **Contact Page**: Contact form with name, email, and message fields.

### Responsive Design
- Fully responsive across mobile, tablet, and desktop devices.

### Buyer Features
- **Wishlist**: Save desired products for future purchases.
- **Cart**: Manage cart items for checkout.
- **Add Review**: User can express their opinion
- These options are disabled for sellers and admins.

### Seller Features
- Personalized dashboard to:
  - Add new products.
  - Edit or delete existing products.
  - View all listed products.

### Admin Features
- Manage users through an admin dashboard:
  - Promote users to sellers.
  - Delete users.
- Admin registration is restricted.

---

## Technical Stack

### Front-End
- **React.js** for building the user interface.
- **TailwindCSS** for responsive and modern styling.

### Back-End
- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** for database management.

### Authentication
- **Firebase Authentication** for user login/registration.
- **JWT** for securing private routes and API endpoints.

---

## How to Run the Application Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/innovix.git
   cd innovix
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:
   -Create a .env.local file in the root directory and add:
   ```bash
   VITE_apiKey=Give your firebase information here
   VITE_authDomain=
   VITE_projectId=
   VITE_storageBucket=
   VITE_messagingSenderId=
   VITE_appId=
   VITE_IMAGE_HOSTING_KEY=Give your imgbb Hosting key information here
3. Run the development server:
   ```bash
    npm run dev
4. Access the application locally at http://localhost:3000

## Credentials for Testing
 # Buyer:
  -Email: shantobuyer@gmail.com
  -Password: #Shanto123@
 # Seller:
  -Email: shantoseller@gmail.com
  -Password: #Shanto123@
 # Admin:
  -Email: shantoadmin@gmail.com
  -Password: #Shanto123@
