import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">🎁 GiftLink</Link>
      </div>
      <div className={styles.navLinks}>
        <Link
          to="/"
          className={`${styles.link} ${
            currentPath === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/main"
          className={`${styles.link} ${
            currentPath.startsWith("/main") ? styles.active : ""
          }`}
        >
          Gifts
        </Link>
        <Link
          to="/search"
          className={`${styles.link} ${
            currentPath.startsWith("/search") ? styles.active : ""
          }`}
        >
          Search
        </Link>
        <Link
          to="/login"
          className={`${styles.link} ${
            currentPath.startsWith("/login") ? styles.active : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`${styles.link} ${
            currentPath.startsWith("/register") ? styles.active : ""
          }`}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
