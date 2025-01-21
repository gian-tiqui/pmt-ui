import { useEffect } from "react";
import PageTemplate from "../templates/PageTemplate";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUserProjects from "../../@utils/functions/fetchUserProjects";
import { ScrollPanel } from "primereact/scrollpanel";
import useProjectIdStore from "../../@utils/zustand/projectId";
import ProjectSection from "../projectsection/ProjectSection";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { setProjectId } = useProjectIdStore();

  useEffect(() => {
    if (!accessAndRefreshTokensNotEmpty()) navigate("/");
  }, [navigate]);

  const {
    data: projects,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [`user-projects`],
    queryFn: () => fetchUserProjects(4, { limit: 100 }),
  });

  if (isLoading) return <p>Loading projects..</p>;

  if (isError) {
    console.error(error);

    return <p>There was an error loading the projects</p>;
  }

  return (
    <PageTemplate>
      <div className="grid w-full grid-cols-12">
        <div className="h-screen col-span-3 px-12 pt-20 bg-inherit">
          <h4 className="font-medium">Projects</h4>
          <ScrollPanel style={{ height: "70vh" }}>
            {projects?.map((project) => (
              <p
                className="hover:cursor-pointer"
                key={project.id}
                onClick={() => setProjectId(project.id)}
              >
                {project.name}
              </p>
            ))}
          </ScrollPanel>
        </div>
        <ProjectSection />
      </div>
    </PageTemplate>
  );
};

export default ProjectsPage;
