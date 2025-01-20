import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteMap } from "../types/types";
import LandingPage from "../components/pages/LandingPage";
import LoginPage from "../components/pages/LoginPage";
import NotFound from "../components/pages/NotFound";

const RouteProvider = () => {
  const routes: RouteMap[] = [
    { name: "Home", path: "/", element: <LandingPage /> },
    { name: "Login", path: "/login", element: <LoginPage /> },
    { name: "Not Found", path: "*", element: <NotFound /> },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} element={route.element} path={route.path} />
        ))}
      </Routes>
    </Router>
  );
};

export default RouteProvider;
