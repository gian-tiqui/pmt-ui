import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteMap } from "../types/types";
import LandingPage from "../components/pages/LandingPage";
import LoginPage from "../components/pages/LoginPage";
import NotFound from "../components/pages/NotFoundPage";
import ForgotPasswordPage from "../components/pages/ForgotPasswordPage";
import Header from "../components/header/Header";
import ProjectLandingSection from "../components/pages/ProjectLandingSectionPage";
import CustomSidebar from "../components/sidebar/CustomSidebar";
import ProjectSection from "../components/pages/ProjectPage";

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
      name: "Main Landing Page",
      path: "/projects",
      element: <ProjectLandingSection />,
      hidden: true,
    },
    {
      name: "Project",
      path: "/projects/:projectId",
      element: <ProjectSection />,
      hidden: true,
    },
  ];

  return (
    <Router>
      <Header />
      <CustomSidebar>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} element={route.element} path={route.path} />
          ))}
        </Routes>
      </CustomSidebar>
    </Router>
  );
};

export default RouteProvider;
