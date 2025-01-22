import { useQuery } from "@tanstack/react-query";
import fetchProjectById from "../../@utils/functions/fetchProjectById";
import { TabPanel, TabView } from "primereact/tabview";
import SummaryPanel from "../projectsection/components/SummaryPanel";
import { useParams } from "react-router-dom";
import ProjectSectionSkeleton from "../skeleton/ProjectSectionSkeleton";
import ProjectSettings from "../projectsection/components/ProjectSettings";
import PageTemplate from "../templates/PageTemplate";

const ProjectSection = () => {
  const { projectId } = useParams();

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [`project-${projectId}`],
    queryFn: () => fetchProjectById(projectId ? +projectId : -1),
    enabled: !!projectId,
  });

  if (isLoading) return <ProjectSectionSkeleton />;

  if (isError) {
    console.error(error);

    return (
      <div className="text-xl text-blue-400">
        Please wait before loading the project.
      </div>
    );
  }

  return (
    <PageTemplate>
      <section>
        <p className="mb-3 text-2xl font-medium text-blue-500 dark:text-blue-400">
          {project?.name}
        </p>
        <TabView
          pt={{
            root: { className: "bg-white dark:bg-slate-900/40" },
            panelContainer: {
              className: "h-96 overflow-y-auto bg-inherit",
            },
            nav: { className: "bg-inherit" },
          }}
        >
          <TabPanel
            header="Summary"
            leftIcon="pi pi-info-circle mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            <SummaryPanel project={project} />
          </TabPanel>
          <TabPanel
            header="Board"
            leftIcon="pi pi-clipboard mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            Board here
          </TabPanel>
          <TabPanel
            header="Timeline"
            leftIcon="pi pi-clock mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            Gantt chart here
          </TabPanel>
          <TabPanel
            header="Calendar"
            leftIcon="pi pi-calendar mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            Calendar here
          </TabPanel>
          <TabPanel
            header="List"
            leftIcon="pi pi-list mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            List here
          </TabPanel>
          <TabPanel
            header="Settings"
            leftIcon="pi pi-cog mr-2"
            pt={{
              headerAction: {
                className: "bg-inherit",
              },
            }}
          >
            <ProjectSettings project={project} />
          </TabPanel>
        </TabView>
      </section>
    </PageTemplate>
  );
};

export default ProjectSection;
