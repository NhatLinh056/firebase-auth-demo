# Firebase Setup Guide

This guide walks you through setting up Firebase Authentication from scratch so that anyone can run this project.

---

## Part 1 — Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter a project name (e.g. `firebase-auth-demo`)
4. Click **Continue**
5. When asked about Google Analytics → **disable it** (not needed for this project)
6. Click **"Create project"** and wait for it to finish
7. Click **"Continue"** to open the project dashboard

---

## Part 2 — Register a Web App

1. On the project dashboard, click the **`</>`** icon (Web)
2. Enter an app nickname (e.g. `firebase-auth-demo-web`)
3. Do **not** check "Firebase Hosting"
4. Click **"Register app"**
5. Firebase will display a `firebaseConfig` object — copy all 6 values

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

6. Click **"Continue to console"**

---

## Part 3 — Enable Authentication

1. In the left sidebar → **Build** → **Authentication**
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab

---

## Part 4 — Enable Google Provider

1. In the Sign-in method list, click **"Google"**
2. Toggle **Enable** to ON
3. Select a support email from the dropdown
4. Click **"Save"**

---

## Part 5 — Enable Facebook Provider

### 5a. Get OAuth Redirect URI from Firebase

1. In Sign-in method, click **"Facebook"**
2. Note the **OAuth redirect URI** shown at the bottom, e.g.:
   ```
   https://YOUR-PROJECT.firebaseapp.com/__/auth/handler
   ```
3. Keep this page open — you will fill in App ID and App Secret after the next steps

### 5b. Create a Facebook App on Meta for Developers

1. Go to [developers.facebook.com](https://developers.facebook.com) and log in
2. Click **"My Apps"** → **"Create App"**
3. Choose **"Authenticate and request data from users with Facebook Login"**
4. Enter app name: `firebase-auth-demo`
5. Enter your contact email
6. Click **"Create app"**

### 5c. Configure Facebook Login

1. In the app dashboard, find **"Facebook Login"** → click **"Set up"** → select **Web**
2. Enter site URL: `http://localhost:5173`
3. Click **Save** and proceed through the setup steps

### 5d. Add OAuth Redirect URI

1. Go to **Facebook Login** → **Settings** in the left sidebar
2. In **"Valid OAuth Redirect URIs"**, paste the Firebase URI from step 5a
3. Click **"Save Changes"**

### 5e. Get App ID and App Secret

1. Go to **App Settings** → **Basic**
2. Copy **App ID** (public)
3. Click **"Show"** next to App Secret → enter your Facebook password → copy the secret

### 5f. Enter credentials in Firebase

1. Go back to Firebase Console → Authentication → Sign-in method → Facebook
2. Enter **App ID** and **App Secret**
3. Click **"Save"**

> ⚠️ Facebook Login in development mode only works for users added as **Testers** in the Meta App dashboard under **Roles → Test Users**.

---

## Part 6 — Configure Authorized Domains

1. In Firebase Console → Authentication → **Settings** tab
2. Scroll to **"Authorized domains"**
3. Verify that `localhost` is in the list
4. If not, click **"Add domain"** and add `localhost`

---

## Part 7 — Set Up Environment Variables

Create a `.env.local` file in the project root (copy from `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

Fill in the values from the `firebaseConfig` object you copied in Part 2.

> The `VITE_` prefix exposes these values to the browser bundle. Firebase Web config is **designed to be public** — it does not grant admin access. Never put private keys or secrets here.

---

## Verification Checklist

- [ ] Firebase project created
- [ ] Web App registered, `firebaseConfig` values obtained
- [ ] Authentication service enabled
- [ ] Google provider enabled and saved
- [ ] Facebook provider configured with App ID + App Secret
- [ ] Firebase OAuth redirect URI added to Meta App
- [ ] `localhost` in Authorized Domains
- [ ] `.env.local` file created with real values
- [ ] `npm run dev` starts without Firebase errors in the browser console
