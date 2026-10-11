# OAuth / Sign-in Flow

## Google Login Flow (Popup)

```
User                Browser              Firebase SDK           Google
 │                     │                      │                    │
 │──click "Google"───→ │                      │                    │
 │                     │──signInWithPopup()──→ │                    │
 │                     │                      │──open popup───────→ │
 │                     │                      │                    │ show account picker
 │                     │                      │                    │
 │──select account──────────────────────────────────────────────→ │
 │                     │                      │                    │ redirect to Firebase callback
 │                     │                      │←──auth code────────│
 │                     │                      │ exchange for token  │
 │                     │                      │ verify with Google  │
 │                     │                      │ create/update user  │
 │                     │←──UserCredential─────│                    │
 │                     │ popup closes          │                    │
 │                     │                      │                    │
 │                     │ onAuthStateChanged fires                   │
 │                     │ AuthContext updates user state             │
 │                     │ App re-renders → DashboardPage             │
```

---

## Facebook Login Flow (Popup)

The flow is identical to Google, with one key difference: **Facebook requires you to configure the OAuth redirect URI manually** in the Meta Developer portal.

```
Firebase Console → Facebook provider settings
    Shows: OAuth redirect URI = https://YOUR-PROJECT.firebaseapp.com/__/auth/handler

Meta Developer App → Facebook Login → Settings
    Valid OAuth Redirect URIs → add the Firebase URI above
```

Without this redirect URI, Facebook will reject the callback and the popup will fail.

---

## What Firebase Handles

| Step | Handled by |
|------|-----------|
| Opening the OAuth popup | Firebase SDK |
| Generating the auth URL (client_id, scope, state) | Firebase SDK |
| Receiving the OAuth callback | Firebase (via `/__/auth/handler`) |
| Exchanging auth code for access token | Firebase servers |
| Verifying the token with Google/Facebook | Firebase servers |
| Creating or updating the user record | Firebase Authentication |
| Storing the session (IndexedDB) | Firebase SDK |
| Restoring session on page reload | Firebase SDK |

**You do not write any of this code.** Firebase handles the entire OAuth exchange behind the scenes.

---

## User Object

After a successful sign-in, Firebase returns a `User` object with the following fields used in this app:

| Field | Source | Example |
|-------|--------|---------|
| `uid` | Firebase (unique per user) | `"abc123xyz"` |
| `displayName` | Google/Facebook profile | `"Nguyen Van A"` |
| `email` | Google/Facebook profile | `"user@gmail.com"` |
| `photoURL` | Google/Facebook profile | `"https://..."` |
| `providerData[0].providerId` | Firebase | `"google.com"` or `"facebook.com"` |

---

## Logout Flow

```
User clicks "Logout"
    → DashboardPage calls signOut()
    → Firebase clears the session from IndexedDB
    → onAuthStateChanged fires with null
    → AuthContext sets user = null
    → App.tsx re-renders → LoginPage shown
```

No server request is needed. Session is managed entirely client-side by the Firebase SDK.

---

## Popup vs Redirect

This app uses **popup** mode. Here is when each mode is appropriate:

| Mode | How it works | Best for |
|------|-------------|----------|
| **Popup** | Small window opens, closes after auth, page stays | Desktop, SPA on localhost |
| **Redirect** | Full page redirect to Google/Facebook, then back | Mobile browsers, strict popup blockers |

Popup was chosen here because:
- Development is on `localhost` — popups work without issues
- No redirect URI needs to be registered for development
- Smoother UX for a demo app — no full page reload
