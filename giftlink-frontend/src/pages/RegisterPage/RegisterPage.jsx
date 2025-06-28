import styles from "./RegisterPage.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  setError,
  setReset,
} from "../../features/auth/authSlice";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/main";

  useEffect(() => {
    dispatch(setReset({ error: null, loading: false }));
  }, [dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");
    dispatch(setReset({ error: null, loading: false }));

    if (formData.password !== formData.confirmPassword) {
      dispatch(setError({ message: "Passwords do not match." }));
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess("Register successfully! Redirecting...");
      navigate(from, { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Registration failed:", err);
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
      <h2>Create Account</h2>
      <form className={styles.form} onSubmit={handleRegister}>
        <div className={styles.row}>
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="lastName">
            Last Name
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
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
        <label htmlFor="confirmPassword">
          Confirm Password
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
          Register
        </button>
        {loading && <p className={styles.loading}>Registering...</p>}
        {error && <p className={styles.error}>{error.message}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <p className={styles.redirectText}>
          Already have Account?{" "}
          <Link to="/login" className={styles.link}>
            Login here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
