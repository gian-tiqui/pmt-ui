import { useEffect } from "react";
import PageTemplate from "../templates/PageTemplate";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessAndRefreshTokensNotEmpty()) navigate("/");
  }, [navigate]);

  return (
    <PageTemplate>
      <div className="w-full h-screen"></div>
    </PageTemplate>
  );
};

export default ProjectsPage;
