import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LayoutWithNav from "./layout/LayoutWithNav";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppLayout from "./layout/AppLayout";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route element={<LayoutWithNav />}>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          //protected route
          <Route element={<AppLayout />}>
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
