import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      dispatch(logout());
    } else {
      e.preventDefault(); //
    }
  };
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
        {user ? (
          <>
            <Link to="/profile" className={`${styles.profile}`}>
              Hello, {user.lastName}
            </Link>
            <Link
              to="/login"
              className={`${styles.link}`}
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
