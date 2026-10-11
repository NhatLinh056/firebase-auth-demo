# firebase-auth-demo

A small web application built with **React + TypeScript + Vite** that demonstrates **Firebase Authentication** using Google and Facebook sign-in. This is **STEP 2** in a 3-step authentication learning path.

---

## 🎯 Purpose

The goal is to understand how Firebase Authentication works, how a React frontend interacts with Firebase, and how user information is handled after sign-in. This is a learning project, not a production application.

**Learning path:**
- STEP 1: Basic OAuth — `oauth-service-demo`
- **STEP 2: Firebase Authentication ← (this project)**
- STEP 3: Custom Auth Service with NestJS — coming later

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18+ | UI framework |
| TypeScript | 5+ | Type safety |
| Vite | 8+ | Build tool & dev server |
| Firebase SDK | 11+ | Authentication service |

---

## ✨ Features

- [x] Login with Google (popup flow)
- [x] Login with Facebook (popup flow)
- [x] Display user info after sign-in (UID, Display Name, Email, Photo, Provider)
- [x] Logout
- [x] Auth state persistence (session survives page reload)
- [x] Loading screen while Firebase checks session
- [x] User-friendly error messages (Vietnamese)
- [x] Silent handling of popup-closed events

---

## 📋 Requirements

- Node.js 18+
- npm 9+
- A Firebase project with Authentication enabled
- A Facebook App (for Facebook Login only)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NhatLinh056/firebase-auth-demo.git
cd firebase-auth-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your real Firebase config values:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values from your Firebase Console:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> See [docs/setup-firebase.md](docs/setup-firebase.md) for a full step-by-step guide on creating a Firebase project and configuring providers.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase Web App ID |

> ⚠️ All `VITE_` prefixed variables are bundled into the frontend — they are **not secrets**. Firebase Web Config is designed to be public. Real security is enforced by Firebase Security Rules.

---

## 📁 Project Structure

```
firebase-auth-demo/
├── src/
│   ├── context/
│   │   └── AuthContext.tsx      # Global auth state (React Context)
│   ├── firebase/
│   │   ├── config.ts            # Firebase App initialization
│   │   └── auth.ts              # AuthService (signIn, signOut, listener)
│   ├── pages/
│   │   ├── LoginPage.tsx        # Login page with Google/Facebook buttons
│   │   └── DashboardPage.tsx    # User info display + logout
│   ├── utils/
│   │   └── authErrors.ts        # Firebase error code → friendly message
│   ├── App.tsx                  # Routing: Login ↔ Dashboard
│   ├── main.tsx                 # App entry point with AuthProvider
│   └── index.css                # Global styles
├── .env.example                 # Environment variable template
├── .env.local                   # Real config values (NOT committed)
└── docs/
    ├── architecture.md          # Frontend architecture explanation
    ├── oauth-flow.md            # Sign-in flow walkthrough
    └── setup-firebase.md        # Firebase setup guide
```

---

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [OAuth / Sign-in Flow](docs/oauth-flow.md)
- [Firebase Setup Guide](docs/setup-firebase.md)

---

## ⚠️ Known Limitations

- No backend or database — user data is only displayed, not stored
- Facebook Login requires a Meta Developer App (see setup guide)
- Facebook Login in development mode only works for users listed as testers in the Meta App
- No routing library used — navigation is handled by conditional rendering
- No token verification on a server — this demo is frontend-only

---

## 🔒 Security Notes

- Firebase config values (API key, etc.) are safe to expose in the frontend
- `VITE_` variables appear in the browser bundle — never put real secrets (e.g. private keys, database passwords) here
- `.env.local` is listed in `.gitignore` and will never be committed
