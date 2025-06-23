import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
