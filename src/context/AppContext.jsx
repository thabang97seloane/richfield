import { createContext, useContext, useEffect, useReducer, useState } from "react";

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

const initialState = {
  user: null,
  posts: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        user: action.payload.user,
        posts: action.payload.posts,
      };

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

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate global state from localStorage once, on first mount.
  useEffect(() => {
    dispatch({
      type: "HYDRATE",
      payload: { user: loadUser(), posts: loadPosts() },
    });
    setHydrated(true);
  }, []);

  // Keep localStorage in sync whenever the user profile changes. Skipped
  // until hydration finishes, otherwise this effect's stale closure over
  // the pre-hydration state would overwrite localStorage with empty data.
  useEffect(() => {
    if (!hydrated) return;
    if (state.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
    }
  }, [state.user, hydrated]);

  // Keep localStorage in sync whenever the posts array changes (same
  // hydration guard as above).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
  }, [state.posts, hydrated]);

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
