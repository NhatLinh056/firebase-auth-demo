# Architecture Overview

## High-Level Architecture

```
Browser
  │
  ├── React App (Vite)
  │     ├── AuthProvider (AuthContext)     ← wraps the entire app
  │     ├── App.tsx                        ← routing: Login ↔ Dashboard
  │     ├── LoginPage.tsx                  ← Google/Facebook buttons
  │     └── DashboardPage.tsx              ← user info + logout
  │
  └── Firebase SDK (client-side)
        └── Firebase Authentication
              ├── Google OAuth Provider
              └── Facebook OAuth Provider
```

---

## Layer Breakdown

### 1. Firebase Initialization (`src/firebase/config.ts`)

Reads environment variables and calls `initializeApp()` to create a singleton Firebase App instance. This must run before any other Firebase service is used.

```
.env.local → config.ts → initializeApp() → Firebase App instance
```

### 2. AuthService (`src/firebase/auth.ts`)

A thin wrapper around the Firebase Auth SDK. Exports three functions:

| Function | What it does |
|----------|-------------|
| `signInWithGoogle()` | Opens a Google popup and returns the authenticated `User` |
| `signInWithFacebook()` | Opens a Facebook popup and returns the authenticated `User` |
| `signOut()` | Signs the user out of Firebase |
| `onAuthStateChange(cb)` | Registers a listener; Firebase calls `cb` on every auth state change |

**Why separate this layer?**  
UI components should not import Firebase directly. If the SDK changes, or if you switch to a different auth provider, you only need to update `auth.ts` — not every component.

### 3. AuthContext (`src/context/AuthContext.tsx`)

A React Context that holds:

| Value | Type | Meaning |
|-------|------|---------|
| `user` | `User \| null` | `null` = not signed in |
| `loading` | `boolean` | `true` while Firebase checks the existing session |

**How it works:**

```
AuthProvider mounts
    → calls onAuthStateChange()
    → Firebase checks existing session (IndexedDB / cookies)
    → callback fires with User or null
    → setUser() + setLoading(false)
    → all consumers re-render with correct state
```

**Why `loading` matters:**  
Without it, the app would briefly flash the Login page even if the user is already signed in (because Firebase needs ~100ms to restore the session). `loading = true` shows a spinner instead.

**Cleanup:**  
`useEffect` returns `unsubscribe()` — this stops the Firebase listener when `AuthProvider` unmounts, preventing memory leaks.

### 4. App Routing (`src/App.tsx`)

No routing library is used. Navigation is pure conditional rendering:

```
loading === true  →  <LoadingScreen />
user !== null     →  <DashboardPage />
user === null     →  <LoginPage />
```

### 5. Pages

**`LoginPage.tsx`**
- Renders Google and Facebook buttons
- Calls `signInWithGoogle()` / `signInWithFacebook()` on click
- Manages per-button loading state independently
- Uses `getAuthErrorMessage()` to display friendly errors

**`DashboardPage.tsx`**
- Reads `user` from `useAuth()`
- Displays: UID, Display Name, Email, Photo URL, Provider
- Calls `signOut()` on logout button click
- After sign-out, `AuthContext` updates → `App.tsx` renders `LoginPage` automatically

### 6. Error Handling (`src/utils/authErrors.ts`)

Maps Firebase error codes to user-friendly Vietnamese messages. Silent errors (e.g. `auth/popup-closed-by-user`) return `null` so no message is shown.

---

## Data Flow: Sign-in

```
User clicks "Login with Google"
    → LoginPage calls signInWithGoogle()
    → Firebase opens Google popup
    → User selects account
    → Google redirects to Firebase callback URL
    → Firebase verifies token, creates/updates user record
    → signInWithPopup() resolves with UserCredential
    → AuthContext listener fires with new User
    → App.tsx re-renders → DashboardPage shown
```

## Data Flow: Page Reload

```
Page loads → AuthProvider mounts
    → onAuthStateChanged fires immediately with existing session
    → If session valid: user set, loading = false → Dashboard
    → If no session: user = null, loading = false → Login
```
