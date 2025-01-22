import { useEffect } from "react";
import PageTemplate from "../templates/PageTemplate";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useNavigate } from "react-router-dom";
import ProjectSection from "./ProjectPage";

const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessAndRefreshTokensNotEmpty()) navigate("/");
  }, [navigate]);

  return (
    <PageTemplate>
      <ProjectSection />
    </PageTemplate>
  );
};

export default ProjectsPage;
