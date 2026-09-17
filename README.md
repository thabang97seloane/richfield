# Richfield Connect

**Student full name & surname:** [YOUR FULL NAME AND SURNAME]
**Student number:** [YOUR STUDENT NUMBER]
**Module:** Web Technology 512
**Assignment title:** Richfield Connect — Academic Social Engagement Platform (React SPA)

## Description

Richfield Connect is a React Single-Page Application built for Richfield
Graduate Institute of Technology students to register an academic profile,
share posts with the student community, and engage with posts through likes
and comments-style interaction (like/delete). The application runs entirely
in the browser — there is no backend, server, or database — and persists
all data using the browser's `localStorage`.

### Component architecture

```
<App>                     Root component — wraps the app in AppProvider
                           (Context API) and defines all React Router routes.
├── <Navbar>               Persistent nav bar, rendered on every view.
├── Routed views
│   ├── <Home>              "/"        Landing page, hero + feature cards.
│   ├── <About>              "/about"   Platform purpose, guidelines, contact info.
│   ├── <SignUp>              "/signup"  Renders <SignUpForm>.
│   │     └── <SignUpForm>       Controlled registration form; renders and
│   │           └── <ProfilePreview> feeds it live data via props.
│   ├── <Profile>             "/profile" Dynamic profile view (state/localStorage only).
│   └── <Feed>                "/feed"    Renders <CreatePost> + a list of <Post>.
│         ├── <CreatePost>       Controlled textarea, dispatches ADD_POST.
│         └── <Post>             One post card: like toggle + delete.
└── <Footer>                Persistent footer, rendered on every view.
```

Global state (the registered user profile and the posts array) is managed
with the Context API (`src/context/AppContext.jsx`) combined with
`useReducer`, exposing four actions: `REGISTER_USER`, `ADD_POST`,
`TOGGLE_LIKE`, and `DELETE_POST`. State is hydrated from `localStorage` on
mount via `useEffect`, and written back to `localStorage` via `useEffect`
whenever the user profile or posts array changes, so the app restores its
exact previous state after a refresh.

### Branding note on the logo

The Home view and Navbar use a styled text/wordmark placeholder for the
Richfield Connect logo (an "R" mark in Richfield Blue `#003087`), as
permitted by the brief ("The Richfield Connect logo **or a styled text
placeholder**"). The development environment this project was built in did
not have network access to richfield.ac.za to pull the official institution
logo asset, so a brand-consistent placeholder was used instead — see
`src/components/Logo.jsx`.

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
