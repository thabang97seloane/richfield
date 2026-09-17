import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext(null);

const USER_STORAGE_KEY = "richfieldConnect_user";
const POSTS_STORAGE_KEY = "richfieldConnect_posts";

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadPosts() {
  try {
    const raw = localStorage.getItem(POSTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "TOGGLE_LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
}

// Lazily reads localStorage once, before the first render, so there is no
// separate hydration pass or loading flicker.
function initState() {
  return { user: loadUser(), posts: loadPosts() };
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, initState);

  // Keep localStorage in sync whenever the user profile changes.
  useEffect(() => {
    if (state.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
    }
  }, [state.user]);

  // Keep localStorage in sync whenever the posts array changes.
  useEffect(() => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
  }, [state.posts]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
