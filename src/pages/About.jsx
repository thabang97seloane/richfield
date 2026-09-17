import styles from "./About.module.css";

const guidelines = [
  "Treat every member of the community with respect and professionalism.",
  "Share only original academic content or properly credited sources.",
  "No harassment, hate speech, or discriminatory content of any kind.",
  "Keep discussions constructive, relevant, and focused on academic growth.",
  "Protect your own and others' privacy — do not share personal data publicly.",
  "Report any content that violates the institution's Academic Integrity Policy.",
];

function About() {
  return (
    <div className={styles.about}>
      <section className={styles.section}>
        <h1>About Richfield Connect</h1>
        <p>
          Richfield Connect is a dedicated academic social engagement
          platform built for the students of Richfield Graduate Institute of
          Technology. Unlike public social media platforms, it is designed
          around institutional values — professionalism, academic integrity,
          and peer collaboration — giving students a structured space to
          register, build an academic profile, and share ideas with their
          peers across all campuses.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Community Guidelines</h2>
        <ol className={styles.guidelines}>
          {guidelines.map((guideline) => (
            <li key={guideline}>{guideline}</li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2>Contact Information</h2>
        <p>
          Email: <a href="mailto:connect@richfield.ac.za">connect@richfield.ac.za</a>
        </p>
        <p>Campus: Richfield Graduate Institute of Technology, Durban Campus</p>
      </section>
    </div>
  );
}

export default About;
