import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProfilePage.module.css";
import { updateUserName, changePassword } from "../../features/auth/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateName = (e) => {
    e.preventDefault();
    if (name && name !== user.name) {
      dispatch(updateUserName(name));
      setName("");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changePassword(passwordData));
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Profile</h2>
      <div className={styles.form}>
        <h3>Email</h3>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            disabled
            readOnly
          />
        </label>
      </div>
      <form className={styles.form} onSubmit={handleUpdateName}>
        <h3>Edit Name</h3>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={name}
            id="name"
            placeholder="Last Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.saveBtn}>
          Save Name
        </button>
      </form>

      <form className={styles.form} onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <label htmlFor="oldPassword">
          Current Password
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Current Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
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
        <label htmlFor="newPassword">
          New Password
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
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
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
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
        <button type="submit" className={styles.saveBtn}>
          Update Password
        </button>
      </form>

      {loading && <p className={styles.loading}>Processing...</p>}
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default ProfilePage;
