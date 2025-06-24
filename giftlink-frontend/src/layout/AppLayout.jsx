import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser, logout } from "../features/auth/authSlice";
import axios from "axios";

const AppLayout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(res.data));
      } catch (err) {
        dispatch(logout());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) return <div>Checking Login...</div>;

  return (
    <div>
      {/* Navigation, Header, etc */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
