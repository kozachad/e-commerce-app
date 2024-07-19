# E-Commerce Application

This is a comprehensive eCommerce application built with .NET 8 for the backend and Angular 18 for the frontend. The application supports user authentication, product management, and order processing.

## Features

- **User Authentication**: JWT token-based authentication, login, and registration.
- **Product Management**: Add, edit, and delete products.
- **Shopping Cart**: Add products to the cart and manage cart items.
- **Order Processing**: Place orders and view order history.
- **User Management Panel**: Users can manage their profiles and view their activities.

## Technologies Used

### Backend

- **.NET 8 Web API**
  - Authentication using JWT tokens
  - RESTful API design
  - Entity Framework Core for database operations

### Frontend

- **Angular 18**
  - Responsive design
  - Service-oriented architecture
  - Form validation and error handling

## Getting Started

### Prerequisites

- **.NET 8 SDK**: [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js and npm**: [Download](https://nodejs.org/)
- **Angular CLI**: Install globally using `npm install -g @angular/cli`

### Installation

#### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/kozachad/ecommerce-app.git
    cd ecommerce-app/backend
    ```

2. Install dependencies:
    ```bash
    dotnet restore
    ```

3. Update the database connection string in `appsettings.json`.

4. Run the application:
    ```bash
    dotnet run
    ```

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200`.

## Usage

### User Authentication

- **Register**: Create a new account.
- **Login**: Authenticate with email and password to receive a JWT token.
- **Token Management**: Access protected routes using the JWT token.

### Product Management

- **Add Product**: Admin users can add new products.
- **Edit Product**: Update existing product details.
- **Delete Product**: Remove products from the catalog.

### Shopping Cart

- **Add to Cart**: Users can add products to their shopping cart.
- **Manage Cart**: Update quantities or remove items from the cart.

### Order Processing

- **Place Order**: Users can place orders for the items in their cart.
- **Order History**: View past orders and their details.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of the feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request.


