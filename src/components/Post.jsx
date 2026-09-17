import { useAppContext } from "../context/AppContext";
import styles from "./Post.module.css";

function Post({ post }) {
  const { dispatch } = useAppContext();

  function handleLike() {
    dispatch({ type: "TOGGLE_LIKE", payload: post.id });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      dispatch({ type: "DELETE_POST", payload: post.id });
    }
  }

  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <span className={styles.username}>{post.username}</span>
        <span className={styles.timestamp}>{post.timestamp}</span>
      </div>

      <p className={styles.content}>{post.content}</p>

      <div className={styles.footer}>
        <button
          type="button"
          onClick={handleLike}
          className={post.liked ? `${styles.like} ${styles.liked}` : styles.like}
        >
          <span aria-hidden="true">{post.liked ? "♥" : "♡"}</span> {post.likes}
        </button>

        <button type="button" onClick={handleDelete} className={styles.delete}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default Post;
