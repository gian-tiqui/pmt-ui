import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteMap } from "../types/types";
import LandingPage from "../components/pages/LandingPage";
import LoginPage from "../components/pages/LoginPage";
import NotFound from "../components/pages/NotFoundPage";
import ForgotPasswordPage from "../components/pages/ForgotPasswordPage";
import ProjectsPage from "../components/pages/ProjectsPage";

const RouteProvider = () => {
  const routes: RouteMap[] = [
    { name: "Home", path: "/", element: <LandingPage />, hidden: false },
    { name: "Login", path: "/login", element: <LoginPage />, hidden: false },
    { name: "Not Found", path: "*", element: <NotFound />, hidden: false },
    {
      name: "Forgot Password",
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
      hidden: false,
    },
    {
      name: "Projects",
      path: "/projects",
      element: <ProjectsPage />,
      hidden: true,
    },
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
