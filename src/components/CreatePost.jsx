import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import styles from "./CreatePost.module.css";

function CreatePost() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch } = useAppContext();

  function handleSubmit(event) {
    event.preventDefault();

    if (!content.trim()) {
      setError("Write something before posting.");
      return;
    }

    const newPost = {
      id: crypto.randomUUID(),
      username: state.user?.fullName || "Anonymous Student",
      timestamp: new Date().toLocaleString("en-ZA", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      content: content.trim(),
      likes: 0,
      liked: false,
    };

    dispatch({ type: "ADD_POST", payload: newPost });
    setContent("");
    setError("");
  }

  function handleChange(event) {
    setContent(event.target.value);
    if (error) setError("");
  }

  return (
    <form className={styles.createPost} onSubmit={handleSubmit}>
      <textarea
        rows={3}
        placeholder="Share an academic thought with the community..."
        value={content}
        onChange={handleChange}
        className={error ? styles.invalid : ""}
      />
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.actions}>
        <button type="submit" className={styles.postButton}>
          Post
        </button>
      </div>
    </form>
  );
}

export default CreatePost;
