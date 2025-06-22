import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>GiftLink</h1>
        <h2>Share Gifts and Joy!</h2>
        <p className={styles.lead}>
          "Sharing is the essence of community. It is through giving that we
          enrich and perpetuate both our lives and the lives of others."
        </p>
        <a href="/main" className={styles.btn}>
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;
