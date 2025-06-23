import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
