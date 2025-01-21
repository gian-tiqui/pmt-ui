import { useEffect } from "react";
import PageTemplate from "../templates/PageTemplate";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useNavigate } from "react-router-dom";
import ProjectSection from "../projectsection/ProjectSection";
import CustomSidebar from "../sidebar/CustomSidebar";

const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessAndRefreshTokensNotEmpty()) navigate("/");
  }, [navigate]);

  return (
    <PageTemplate>
      <div className="grid w-full grid-cols-12 dark:text-white">
        <CustomSidebar />
        <ProjectSection />
      </div>
    </PageTemplate>
  );
};

export default ProjectsPage;
