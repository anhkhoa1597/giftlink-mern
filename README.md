# 🎁 GiftLink - MERN Stack Application

GiftLink is a full-stack web application that allows users to create and share personalized gift pages with friends, family, or communities. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides a seamless, secure, and modern user experience for both gift creators and recipients.

This project was developed as part of the IBM Fullstack Software Developer Capstone and also serves as a personal portfolio project to demonstrate practical fullstack skills and deployment pipelines.

---

## 🌟 Project Vision

Gift-giving should be joyful — not stressful. GiftLink aims to simplify how people organize and share gift options for events like birthdays, baby showers, or weddings. Instead of guessing or sending repetitive messages, users can create a beautiful gift page with descriptions, options, and real-time claim status.

---

## 🚀 Features

### 👤 Authentication

- Email-based registration and login
- JWT-based authentication (stateless)
- Redux Toolkit for auth state
- Confirmation prompt before logout

### 📝 Gift Management

- Create gift pages with headings and list items
- Add, remove, and edit gifts dynamically
- Restrict editing to one item at a time to avoid conflict
- Comment system on each gift detail page

### 🔎 Gift Browsing

- Landing page with overview
- Search functionality
- Detail view for each gift page
- Responsive UI for mobile and desktop

### 💬 Comment System

- Hardcoded for now, but structured for future API integration
- Displays author and comment content with clean UI

### ⚙️ State Management

- Complex state using `useReducer` + `immer` for deeply nested objects
- Redux Toolkit with `createAsyncThunk` for async API actions
- Separates state slices for authentication and gift logic

### 🧪 CI/CD and DevOps

- GitHub Actions for CI
- Dockerized client and server
- Deployable to IBM Code Engine or any Kubernetes-compatible platform

---

## 🧱 Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Frontend   | React + Vite + React Router        |
| State      | Redux Toolkit + useReducer + immer |
| Backend    | Express.js + Node.js               |
| Database   | MongoDB + Mongoose                 |
| Auth       | JWT (access token stored in Redux) |
| Deployment | Docker, GitHub Actions, K8s        |

---

## 🗂️ Project Structure

```
giftlink-mern/
├── client/                    # Vite + React app
│   ├── app/                   # Redux store config
│   ├── components/            # Reusable UI components
│   ├── features/              # Redux slices and logic
│   ├── pages/                 # Route views
│   ├── assets/                # Images, styles
│   └── main.jsx               # App entry
└── server/                    # Express backend
    ├── controllers/           # Request handlers
    ├── routes/                # API routes
    ├── models/                # Mongoose schemas
    └── middleware/            # Auth middleware, error handlers
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Docker (for production setup)

### 1. Clone the repository

```bash
git clone https://github.com/anhkhoa1597/giftlink-mern.git
cd giftlink-mern
```

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure environment variables

#### Server (`server/.env`)

```
PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
```

#### Client (`client/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run development server

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

App will be running at:  
Frontend → `http://localhost:5173`  
Backend API → `http://localhost:5000/api`

---

## 🐳 Docker Deployment

Build Docker images:

```bash
docker-compose up --build
```

Update `.env` files accordingly for production.

---

## 🌐 Live Demo (Optional)

> [Coming Soon: Deployed on IBM Code Engine or Render]

---

## 📌 Roadmap

- [x] JWT Authentication
- [x] Dynamic Gift List Management
- [x] Edit Conflict Prevention
- [x] useReducer + immer for nested state
- [x] Redux + createAsyncThunk for gifts
- [x] Responsive UI
- [ ] Comment API with sentiment analysis
- [ ] Admin dashboard
- [ ] Email notifications

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

- IBM Fullstack Developer Certificate Capstone
- React, Redux Toolkit, Express, MongoDB communities
