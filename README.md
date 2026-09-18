# Richfield Connect

**Student full name & surname:** [YOUR FULL NAME AND SURNAME]
**Student number:** [YOUR STUDENT NUMBER]
**Module:** Web Technology 512
**Assignment title:** Richfield Connect — Academic Social Engagement Platform (React SPA)

## Description

Richfield Connect is a React Single-Page Application built for Richfield
Graduate Institute of Technology students to register an academic profile,
log back in, share posts with the student community, and engage with posts
through likes and deletion. The application runs entirely in the browser —
there is no backend, server, or database — and persists all data using the
browser's `localStorage`.

Registering creates a local account (`/signup`) and logs the student in
immediately; a returning student can log back in at `/login` with the same
email and password. While logged in, the Sign Up and Log In views redirect
to the profile instead of displaying, and the Navbar/Footer swap those links
for Profile/Feed/Log Out. Since there is no backend, the password itself is
never stored — only a SHA-256 hash of it (`src/utils/hash.js`) — which
limits but does not replace real server-side authentication.

### Component architecture

```
<App>                     Root component — wraps the app in AppProvider
                           (Context API) and defines all React Router routes.
├── <Navbar>               Persistent nav bar, rendered on every view.
├── Routed views
│   ├── <Home>              "/"        Landing page, hero + feature cards.
│   ├── <About>              "/about"   Platform purpose, guidelines, contact info.
│   ├── <SignUp>              "/signup"  Renders <SignUpForm>, or redirects to
│   │     └── <SignUpForm>       /profile if already logged in.
│   │           └── <ProfilePreview> Live preview, fed via props.
│   ├── <Login>                "/login"   Renders <LoginForm>, or redirects to
│   │     └── <LoginForm>          /profile if already logged in.
│   ├── <Profile>             "/profile" Dynamic profile view (state/localStorage only).
│   └── <Feed>                "/feed"    Renders <CreatePost> + a list of <Post>.
│         ├── <CreatePost>       Controlled textarea, dispatches ADD_POST.
│         └── <Post>             One post card: like toggle + delete.
└── <Footer>                Persistent footer, rendered on every view.
```

Global state (the registered user profile, login status, and the posts
array) is managed with the Context API (`src/context/AppContext.jsx`)
combined with `useReducer`, exposing six actions: `REGISTER_USER`, `LOGIN`,
`LOGOUT`, `ADD_POST`, `TOGGLE_LIKE`, and `DELETE_POST`. State is hydrated
from `localStorage` on mount via `useEffect`, and written back to
`localStorage` via `useEffect` whenever the user profile, login status, or
posts array changes, so the app restores its exact previous state
(including whether you're logged in) after a refresh.

### Branding note on the logo

The Home view and Navbar display the official Richfield logo
(`src/assets/richfield-logo.png`), extracted from the institution's
supplied logo asset, with the word "Connect" styled alongside it to form
the Richfield Connect brand mark — see `src/components/Logo.jsx`.

## Running the application locally

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open the printed local URL (typically `http://localhost:5173`) in your
   browser.

Other available scripts:

- `npm run build` — creates a production build in `dist/`.
- `npm run preview` — serves the production build locally.
- `npm run lint` — runs Oxlint against the project.

## External resources referenced

- [React documentation](https://react.dev/)
- [React Router v6 documentation](https://reactrouter.com/en/6.30.6)
- [Vite documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/) — form validation, Web Storage API (`localStorage`), `crypto.randomUUID()`
