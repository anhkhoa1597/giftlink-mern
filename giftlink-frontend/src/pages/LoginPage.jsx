import styles from "./LoginPage.module.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setError } from "../features/auth/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/main";

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess("");
    dispatch(setError(null));

    try {
      await dispatch(loginUser(formData)).unwrap();
      setFormData({ email: "", password: "" });
      setSuccess("Login successfully! Redirecting...");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <button className={styles.submitBtn} type="submit">
          Login
        </button>
        {loading && <p className={styles.loading}>Logging in...</p>}
        {error && <p className={styles.error}>{error.message}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <p className={styles.redirectText}>
          Do not have Account?{" "}
          <Link to="/register" className={styles.link}>
            Register here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
