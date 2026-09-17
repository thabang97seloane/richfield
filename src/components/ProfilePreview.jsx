import styles from "./ProfilePreview.module.css";

function getInitials(fullName) {
  if (!fullName.trim()) return "?";
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

// Pure presentational component: receives all data as props from
// SignUpForm and re-renders live as the user types, with no state of its own.
function ProfilePreview({ fullName, bio, campus, interests }) {
  return (
    <aside className={styles.preview}>
      <h3>Live Profile Preview</h3>

      <div className={styles.avatar}>{getInitials(fullName)}</div>

      <p className={styles.name}>{fullName || "Your Name"}</p>
      <p className={styles.campus}>{campus || "Campus not selected yet"}</p>

      <p className={styles.bio}>
        {bio || "Your short bio will appear here as you type it."}
      </p>

      <div className={styles.tags}>
        {interests.length > 0 ? (
          interests.map((interest) => (
            <span key={interest} className={styles.tag}>
              {interest}
            </span>
          ))
        ) : (
          <span className={styles.placeholder}>No interests selected</span>
        )}
      </div>
    </aside>
  );
}

export default ProfilePreview;
