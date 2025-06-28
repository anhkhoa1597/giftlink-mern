# GiftLink 🎁

[![CI/CD](https://github.com/anhkhoa1597/giftlink-mern/actions/workflows/main.yml/badge.svg)](https://github.com/anhkhoa1597/giftlink-mern/actions)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/anhkhoa1597/giftlink-mern)

GiftLink is a fullstack web application that helps users search, share, and recommend meaningful gifts based on needs and emotions.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [License](#license)
- [Contact](#contact)

---

## 🚀 Features

- 🔍 Gift search by keyword or emotion
- 💡 Smart gift suggestions
- 🧾 User registration and login
- 📦 Responsive frontend with clean UI
- 🌐 REST API with JWT authentication
- 🛠️ CI/CD pipeline with GitHub Actions

---

## 📦 Tech Stack

- **Frontend**: React, Redux Toolkit, Vite
- **Backend**: Node.js, Express, MongoDB
- **CI/CD**: GitHub Actions
- **Package Manager**: Yarn (frontend), NPM (backend)

---

## 🖼️ Screenshots

_(Coming soon: Add screenshots of the UI here)_

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/anhkhoa1597/giftlink-mern.git
cd giftlink-mern

# Setup frontend
cd giftlink-frontend
yarn install
yarn dev

# Setup backend
cd ../giftlink-backend
npm install
npm start
```

---

## 🔐 Environment Variables

Create `.env` file in `giftlink-backend` with:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

---

## 🗂️ Folder Structure

```
giftlink-mern/
├── giftlink-frontend/     # React + Vite frontend
├── giftlink-backend/      # Express backend
└── .github/workflows/     # GitHub Actions CI/CD configs
```

---

## 📜 Scripts

**Frontend (Yarn)**

```bash
yarn dev         # Start Vite dev server
yarn build       # Build production frontend
yarn lint        # Run ESLint
```

**Backend (NPM)**

```bash
npm start        # Start backend server
npm run lint     # Run ESLint
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

- Author: Anhkhoa1597
- Ask questions on [DeepWiki](https://deepwiki.com/anhkhoa1597/giftlink-mern)
