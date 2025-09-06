
# 🛒 E-Commerce Web Application

A **full-stack e-commerce web app** with **React.js (frontend)** and **Node.js/Express (backend)**.
It includes **user authentication, product management, and a shopping cart with persistence**.

🔗 **GitHub Repo:** \[Add your repo link here]
🌐 **Live Demo:** \[Add deployed link here]

---

## ✨ Features

### 🔹 Backend (Node.js + Express + MongoDB)

* 🔑 **Authentication**: JWT-based login & signup
* 📦 **Product Management**: CRUD + filtering, sorting, and categories
* 🛒 **Shopping Cart**: Add, update, remove, and persist items
* 🔒 **Security**: Password hashing with `bcryptjs`, protected routes, CORS enabled
* ⚡ **Error Handling**: Centralized error responses and validation

### 🔹 Frontend (React + TypeScript + Vite)

* 🎨 **Modern UI**: Responsive design with Tailwind CSS
* 🔐 **User Auth**: Login/signup with validation and state management
* 🛍️ **Product Listing**: Grid & list view, search, and filter options
* 🛒 **Cart Management**: Real-time cart updates with persistence in localStorage
* 🌍 **Context API**: State management for auth and cart

---

## 🛠️ Tech Stack

### Backend

* Node.js, Express.js
* MongoDB + Mongoose
* JWT, bcryptjs, CORS

### Frontend

* React.js (with TypeScript)
* Vite
* Tailwind CSS
* Context API
* Lucide React (icons)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shadab-2604/ShopHub
cd ecommerce-fullstack-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure MongoDB

#### Option A: Local MongoDB

* Install MongoDB Community Edition
* Start service:

  ```bash
  # macOS
  brew services start mongodb-community
  # Windows
  net start MongoDB
  # Linux
  sudo systemctl start mongod
  ```

#### Option B: MongoDB Atlas

* Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
* Create a free cluster
* Copy your connection string and update in `.env`

### 4️⃣ Setup Environment Variables

Create `.env` inside `server/` with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-strong-secret-key
CLIENT_URL=http://localhost:5173
```

⚠️ Change `JWT_SECRET` in production!

### 5️⃣ Seed Dummy Data (Optional)

```bash
npm run seed
```

---

## 🚀 Running the App

### Development Mode (frontend + backend together)

```bash
npm run dev
```

* Backend → `http://localhost:5000`
* Frontend → `http://localhost:5173`

### Run Separately

```bash
npm run server   # backend
npm run client   # frontend
```

---

## 📚 API Endpoints

### 🔑 Authentication

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `GET /api/auth/me` → Get logged-in user

### 📦 Products

* `GET /api/products` → Get all products (with filters)
* `GET /api/products/:id` → Get single product
* `GET /api/products/categories` → Get categories

### 🛒 Cart (requires login)

* `GET /api/cart` → Get user cart
* `POST /api/cart/add` → Add item
* `PUT /api/cart/update` → Update item
* `DELETE /api/cart/remove/:id` → Remove item
* `DELETE /api/cart/clear` → Clear cart

---

## 📂 Project Structure

```
ecommerce-fullstack-app/
├── server/           # Backend
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   ├── middleware/  # Auth middleware
│   ├── server.js    # Entry point
│   └── seedData.js  # Seed script
├── src/             # Frontend
│   ├── components/  # React components
│   ├── contexts/    # Context providers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env             # Environment vars
├── package.json
└── README.md
```

---

## 🌍 Deployment

### Backend

* Deploy to **Render** / **Railway**
* Set environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`)

### Frontend

* Build:

  ```bash
  npm run build
  ```
* Deploy `/dist` folder to **Vercel** or **Netlify**
* Update frontend API URLs to match backend deployment

---

## 🐞 Troubleshooting

* **MongoDB Error** → Ensure DB is running locally or correct Atlas URI
* **Port in Use** → Change `PORT` in `.env`
* **CORS Error** → Ensure `CLIENT_URL` matches frontend URL in `.env`

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`feature/new-feature`)
3. Commit changes
4. Open a pull request

---

## 📜 License

This project is licensed under the **MIT License**.

