# Inventory Frontend

This is the frontend client for the Inventory Management Application. It's a single-page application that interacts with the `inventory-backend` to handle user authentication and display a list of products.

##  Technologies Used

  * **Framework:** React
  * **Language:** JavaScript 
  * **State Management:**  Context API.
  * **Styling:**  CSS.
  * **Networking:** Axios
  * **Build Tool:** Vite / Create React App

##  Prerequisites

To run this frontend application, you will need the following installed on your machine:

  * **Node.js** (LTS version recommended)
  * **npm** or **Yarn**

## 🛠 Setup and Run Instructions

Follow these steps to get the frontend running locally.

### 1\. Clone the Repository

Clone this project to your local machine using the following command:

```bash
git clone https://github.com/your-username/inventory-frontend.git
cd inventory-frontend
```

### 2\. Install Dependencies

Install all the required project dependencies:

```bash
npm install
# or yarn install
```

### 3\. Configure the Backend API URL

The frontend needs to know where your backend server is running.

  * Open the `src/api/axiosConfig.js` file.
  * Ensure that the `baseURL` is set to the correct backend address. If you are running the backend locally, this will be:
    ```javascript
    const api = axios.create({
      baseURL: 'http://localhost:8080',
    });
    ```
  * You may also need to configure a `.env` file with the `REACT_APP_API_BASE_URL` variable if your project uses one.

### 4\. Run the Application

Start the development server with the following command:

```bash
npm start
# or npm run dev (if using Vite)
```

The application will open in your default browser at `http://localhost:3000` (or another port if configured). It will now be able to communicate with the `inventory-backend` (assuming the backend is running).

### 5\. Authentication and Usage

  * **Login/Register:** Use the `/login` or `/register` page to authenticate. A successful login will store a JWT token in local storage.
  * **Access Protected Content:** The application will automatically use this stored token to make requests to protected routes on the backend, such as the `/products` page.
