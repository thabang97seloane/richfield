import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./Home.module.css";

const features = [
  {
    title: "Connect with Peers",
    text: "Build a network of fellow Richfield students across campuses and qualifications.",
  },
  {
    title: "Share Academic Ideas",
    text: "Post thoughts, projects, and questions to the student community and get feedback.",
  },
  {
    title: "Build Your Profile",
    text: "Showcase your interests, campus, and bio in a professional academic profile.",
  },
];

function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <Logo size="lg" />
        <h1>Richfield Connect</h1>
        <p className={styles.slogan}>
          The academic social engagement platform, built for Richfield
          students, by Richfield students.
        </p>
        <Link to="/signup" className={styles.cta}>
          Register Now
        </Link>
      </section>

      <section className={styles.features}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.card}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
