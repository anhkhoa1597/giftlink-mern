import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LayoutWithNav from "./layout/LayoutWithNav";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layout/AppLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route element={<LayoutWithNav />}>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          //protected route
          <Route element={<AppLayout />}>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
