# 🤖 Chatbot — Frontend

A responsive chatbot frontend built with **React, Vite, and Tailwind CSS**, connected to a Node.js/Express backend for user authentication and persistent chat management.

## ✨ Features

* 🔐 Email-based OTP authentication
* 🔑 JWT-based authentication
* 💬 Multiple chat conversations
* ➕ Create new chats
* 📜 View previous chat history
* 🗑️ Delete chats
* 💾 Persistent conversations through the backend
* 📱 Responsive user interface
* ⏳ Loading states
* 🔔 Toast notifications
* 🧭 Client-side routing

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hot Toast
* React Icons

### Backend

The frontend communicates with a Node.js/Express backend for:

* User authentication
* OTP verification
* User profile
* Chat creation
* Chat history
* Conversation persistence
* Chat deletion

---

## 🏗️ Application Architecture

```text
                    React Frontend
                          │
                          │ HTTP Requests
                          ▼
                   Express Backend
                          │
                          ▼
                       MongoDB
                          │
              ┌───────────┴───────────┐
              │                       │
            Users                    Chats
                                      │
                                      ▼
                                Conversations
```

---

## 🔄 Chat Flow

```text
User enters message
        ↓
React Chat Interface
        ↓
Process message
        ↓
Display response
        ↓
Send conversation to backend
        ↓
Conversation stored in MongoDB
        ↓
Available in chat history
```

## 🔐 Authentication Flow

The frontend uses an email OTP authentication system with JWT-based authorization.

```text
User enters email
       ↓
POST /api/user/login
       ↓
OTP sent to email
       ↓
Verification token received
       ↓
User enters OTP
       ↓
POST /api/user/verify
       ↓
JWT received
       ↓
JWT stored in localStorage
       ↓
User authenticated
```

Authentication state is managed through `UserContext.jsx`.

---

## 🧭 Routing

The application uses React Router.

| Route     | Purpose             |
| --------- | ------------------- |
| `/`       | Main chat interface |
| `/login`  | Login page          |
| `/verify` | OTP verification    |

---

## 📂 Project Structure

```text
Chatbotfront/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   ├── ChatContext.jsx
│   │   └── UserContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Verify.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🧩 Main Components

### `Home.jsx`

The main chatbot interface.

Responsibilities include:

* Displaying messages
* Handling user input
* Sending messages
* Managing loading states
* Automatically scrolling messages
* Displaying the responsive sidebar

### `Sidebar.jsx`

Provides chat management functionality:

* Create new chat
* Display existing chats
* Select a chat
* Delete a chat
* Logout

### `Header.jsx`

Provides the header section of the chatbot interface.

### `Loading.jsx`

Reusable loading components used during authentication and chat operations.

---

## 🧠 React Context

### UserContext

`UserContext.jsx` manages authentication-related state.

```text
UserContext
│
├── loginUser()
├── verifyUser()
├── fetchUser()
├── logoutHandler()
├── isAuth
├── user
└── loading
```

It communicates with the backend using Axios and manages authentication tokens.

### ChatContext

`ChatContext.jsx` manages chat-related state.

```text
ChatContext
│
├── messages
├── chats
├── prompt
├── createChat()
├── fetchChats()
├── fetchMessages()
├── fetchResponse()
└── deleteChat()
```

---

## 🔗 Backend Integration

The frontend communicates with the Express backend using Axios.

### Backend Server

```text
https://chatbot-4lqt.onrender.com
```

### Authentication APIs

```text
POST /api/user/login
POST /api/user/verify
GET  /api/user/me
```

### Chat APIs

```text
POST   /api/chat/new
GET    /api/chat/all
GET    /api/chat/:id
POST   /api/chat/:id
DELETE /api/chat/:id
```

Protected requests use the JWT authentication token.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/GoelDivya2/Chatbotfront.git
```

### 2. Navigate to the project

```bash
cd Chatbotfront
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will start the development server and provide a local URL.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Preview

```bash
npm run preview
```

Previews the production build locally.

---

## 📱 Responsive Design

The application is designed to work across desktop and mobile screen sizes.

### Desktop

```text
┌──────────────┬─────────────────────────┐
│              │                         │
│   Sidebar    │       Chat Area         │
│              │                         │
│   Chats      │       Messages          │
│              │                         │
│   Logout     │       Input             │
└──────────────┴─────────────────────────┘
```

### Mobile

The sidebar can be opened and closed to provide more space for the chat interface.

---

## 🔮 Future Improvements

* Improve chat UI and UX
* Add message search
* Add message editing
* Add conversation export
* Improve error handling
* Add better loading states
* Add pagination for chat history
* Add dark mode
* Improve mobile experience

---

## 👨‍💻 Author

**Divya Goel**

B.Tech Computer Science & Engineering

---

⭐ Built with React, Vite, Tailwind CSS.
