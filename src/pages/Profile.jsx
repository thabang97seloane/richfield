import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styles from "./Profile.module.css";

function getInitials(fullName) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Profile() {
  const { state } = useAppContext();
  const { user, posts, isAuthenticated } = state;

  if (!isAuthenticated || !user) {
    const hasAccount = Boolean(user);
    return (
      <div className={styles.empty}>
        <h2>{hasAccount ? "You're logged out" : "No profile found"}</h2>
        <p>
          {hasAccount
            ? "Log in to view your academic profile."
            : "Register for Richfield Connect to create your academic profile."}
        </p>
        <Link to={hasAccount ? "/login" : "/signup"} className={styles.cta}>
          {hasAccount ? "Go to Log In" : "Go to Sign Up"}
        </Link>
      </div>
    );
  }

  const postCount = posts.filter(
    (post) => post.username === user.fullName
  ).length;

  return (
    <div className={styles.profile}>
      <div className={styles.card}>
        <div className={styles.avatar}>{getInitials(user.fullName)}</div>
        <h1>{user.fullName}</h1>
        <p className={styles.campus}>{user.campus}</p>

        <dl className={styles.details}>
          <div>
            <dt>Student Number</dt>
            <dd>{user.studentNumber}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>

        <div className={styles.tags}>
          {user.interests.map((interest) => (
            <span key={interest} className={styles.tag}>
              {interest}
            </span>
          ))}
        </div>

        <p className={styles.bio}>{user.bio}</p>

        <div className={styles.stats}>
          <div>
            <strong>{postCount}</strong>
            <span>Posts</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Connections</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Groups</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
