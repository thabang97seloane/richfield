import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import styles from "./Feed.module.css";

function Feed() {
  const { state } = useAppContext();

  return (
    <div className={styles.feed}>
      <h1>Student Feed</h1>
      <CreatePost />

      {state.posts.length === 0 ? (
        <p className={styles.empty}>
          No posts yet. Be the first to share something with the community.
        </p>
      ) : (
        state.posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Feed;
