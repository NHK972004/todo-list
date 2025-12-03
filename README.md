# Todo List Web App (Frontend)

A clean and simple Todo List web application built with **React + Vite**.

This repository contains the **frontend** that I designed and implemented.  
The app communicates with an **external REST API backend** (not part of this repo), which is deployed for free using Render.

> This project is part of my portfolio for frontend .

---

## Live Demo

- **Frontend (Vercel)**: https://todo-list-frontend-beryl-ten.vercel.app/

---

## Features

Update this list if you add more features.

- ✅ Create, read, update, and delete Users/Books (CRUD).
- ✅ Create new tasks / Delete tasks.
- ✅ Tasks are persisted via REST API calls to an external backend.
- ✅ Responsive layout (works on desktop and mobile).
- ✅ Users: sign up, log in, log out, view details, edit information.
- ✅ Books: each user has their own personal book collection, with full CRUD and detail view for each book.

---

## Tech Stack

**Frontend**

- React (with hooks)
- Vite
- JavaScript (ES6+)
- CSS (responsive styling)

**Backend (external API)**

- REST API provided by a separate backend service
- Deployed on **Render** (free tier)
- Handles task storage and business logic

In this repository I focus on:

- Building the UI from scratch
- Managing state and user interactions in React
- Integrating with a real REST API
- Handling loading / error states from API responses

---

## Architecture

This is a **frontend-only** repository.  
The data is handled by a separate backend API.

```text
React + Vite SPA (this repo)
    |
    |-- HTTP requests (fetch / axios)
    v
External REST API (Render)
    |
    v
Database (managed by backend service)
