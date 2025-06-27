import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(false);

  const handleLogout = (e) => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      dispatch(logout());
    } else {
      e.preventDefault();
    }
  };

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu}>
          🎁 GiftLink
        </NavLink>
      </div>

      <div
        className={`${styles.hamburgerBtn} ${isActive ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.navLinks} ${isActive ? styles.open : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/main"
          onClick={closeMenu}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Gifts
        </NavLink>
        <NavLink
          to="/search"
          onClick={closeMenu}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Search
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={`${styles.link} ${styles.profile}`}
            >
              Hello, {user.lastName}
            </NavLink>
            <NavLink
              to="/login"
              onClick={(e) => {
                handleLogout(e);
                closeMenu();
              }}
              className={styles.link}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
