# 🍽️ Home Kitchen Pickup App

A modular backend API built with Express and Mongoose to manage home-cooked meal pickups, menu rotation, customer profiles, and analytics. Designed for scalability, real-world relevance.

## 🚀 Tech Stack

- Node.js with ES Modules (`.mjs`)
- Express for routing and middleware
- Mongoose for MongoDB ODM
- dotenv for environment configuration
- CORS for cross-origin support

## Menu API Endpoints

 Basic CRUD Routes
- GET /menu – Returns all menu items
- GET /menu/:id – Returns a single menu item by ID
- POST /menu – Creates a new menu item
example .json :
{
  "name": "Paneer Tikka",
  "price": 7.99,
  "isVeg": true,
  "available": true,
  "timesOrdered": 0
}
- PATCH /menu/:id – Updates a menu item by ID
- DELETE /menu/:id – Deletes a menu item by ID
- GET /menu/all – Deletes all menu items (use with caution)
  


##  Analytics API Endpoint
- /menu/analytics/group-by-veg – Groups menu items by vegetarian and non-vegetarian
- /menu/analytics/most-expensive – Returns the most expensive menu item
- /menu/analytics/price-below-5 – Lists items priced below ₹5
- /menu/analytics/group-by-availability – Groups items by availability status
- /menu/analytics/group-by-same-price – Groups items that have the same price
- customers/analytics/active - give list of all active customers

## Installation
-git clone https://github.com/yourusername/homekitchen.git
-cd homekitchen
-npm install
-npm run dev

##⚙️ Make sure to configure your .env file with:
-MONGO_URI=your_mongodb_connection_string
-PORT=5000







