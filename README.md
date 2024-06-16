# Inventory and Manufacturing Management System

This project is a simplified version of an inventory and manufacturing unit management system focused on an order system. It is built using React and Next.js, with extensive use of array and object manipulation, filtering, and mapping, along with design logic implemented using Tailwind CSS.

## Live Demo

A live version of the project is deployed on Vercel and can be accessed [here](https://inventory-management-system-livid.vercel.app/).

## Project Overview

### Features

1. **Order List Page**
   - Displays a list of orders with ID, customer name, status, and item count.
   - Allows filtering orders by status (Pending, Completed).
   - Supports sorting orders by customer name and item count.

2. **Order Details Page**
   - Shows detailed information about a specific order.
   - Displays items in the order, their quantities, and stock availability.
   - Implements a button to mark the order as completed, updating the status.

3. **Inventory Management**
   - Lists all items with their respective stock levels.
   - Allows filtering items by stock availability (In stock, Out of stock).
   - Provides functionality to add new items to the inventory.
   - Supports editing and deleting items from the inventory.

4. **Dashboard**
   - Displays statistics such as total items and orders.

### Design Choices and Implementation Details

#### Design Choices

##### Framework and Libraries

- **Next.js:** Chosen for its server-side rendering capabilities, which enhances performance and SEO.

- **React:** Used for building interactive user interfaces with its component-based architecture, making it easier to manage state and UI elements.

- **Tailwind CSS:** Selected for its utility-first approach, allowing rapid styling without writing custom CSS. This results in a consistent design system and responsive layout across devices.

##### User Experience (UX) and Accessibility

- **Responsive Design:** Tailwind CSS classes were utilized to ensure the application is responsive on various screen sizes, enhancing usability on both desktop and mobile devices.

##### Component Design

- **Reusable Components:** Components were designed to be reusable and composable, following React's best practices. This approach improves maintainability and reduces redundancy in the codebase.

- **Modals and Notifications:** Used for displaying contextual information and user actions without disrupting the main flow of the application. Modals were implemented using React portals for better separation of concerns.

#### Implementation Details

##### Array and Object Manipulations

- **Filtering Orders and Items:** JavaScript array methods such as `filter()` were used to implement functionalities like filtering orders by status (Pending, Completed) and filtering items by stock availability (In stock, Out of stock). These methods allow for efficient data manipulation without mutating the original arrays.

- **Sorting Orders:** The `sort()` method was utilized to enable sorting orders by customer name and item count. Custom comparator functions were implemented to define sorting criteria based on specific object properties.

- **Updating Order Status:** When marking an order as completed, the application updates the status of the order in the orders array using array manipulation techniques like finding the index of the order and updating its status property.

- **Adding, Editing, and Deleting Items:** Object manipulation techniques such as spreading (`...`) and object destructuring were employed to add new items to the inventory, edit existing item details, and delete items from the inventory array. These operations ensure data integrity and provide a seamless user experience.

##### State Management

- **Local Storage:** Used to persist the state of orders and inventory between page reloads. This ensures that user data remains intact even after the browser is closed or refreshed.

##### Performance Considerations

- **Pagination:** Implemented on the order list and inventory list to optimize performance when handling large datasets. Pagination reduces the initial load time and improves the overall responsiveness of the application.

## Getting Started

### Prerequisites

- Node.js installed on your local development machine.

### Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
   
2. Navigate into the project directory:

    ```bash
    cd <project_directory>

3. Install dependencies:

    ```bash
    npm install

### Running the Application

1. Start the development server:
    ```bash
    npm run dev

2. Open your browser and navigate to http://localhost:3000 to view the application. 
