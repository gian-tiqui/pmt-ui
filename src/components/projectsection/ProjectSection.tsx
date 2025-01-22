import { useQuery } from "@tanstack/react-query";
import useProjectIdStore from "../../@utils/zustand/projectId";
import fetchProjectById from "../../@utils/functions/fetchProjectById";
import { TabPanel, TabView } from "primereact/tabview";
import SummaryPanel from "./components/SummaryPanel";
import ProjectLandingSection from "../pages/ProjectLandingSectionPage";

const ProjectSection = () => {
  const { projectId } = useProjectIdStore();

  const { data: project, isLoading } = useQuery({
    queryKey: [`project-${projectId}`],
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId,
  });

  if (!projectId) return <ProjectLandingSection />;

  if (isLoading)
    return (
      <section className="grid col-span-9 bg-inherit place-content-center">
        Project loading.
      </section>
    );

  return (
    <section className="col-span-9 px-4 pt-20">
      <p className="mb-3 text-2xl font-medium text-blue-500 dark:text-blue-400">
        {project?.name}
      </p>
      <TabView
        pt={{
          panelContainer: {
            className: "h-96 overflow-y-auto bg-white dark:bg-slate-900/40",
          },
          nav: { className: "bg-white dark:bg-slate-900/40" },
        }}
      >
        <TabPanel
          header="Summary"
          leftIcon="pi pi-info-circle mr-2"
          pt={{
            headerAction: {
              className: "bg-inherit",
            },
            content: { className: "bg-inherit" },
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
            content: { className: "bg-inherit" },
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
            content: { className: "bg-inherit" },
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
            content: { className: "bg-inherit" },
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
            content: { className: "bg-inherit" },
          }}
        >
          List here
        </TabPanel>
        <TabPanel
          header="Settings"
          leftIcon="pi pi-gear mr-2"
          pt={{
            headerAction: {
              className: "bg-inherit",
            },
            content: { className: "bg-inherit" },
          }}
        >
          Settings here
        </TabPanel>
      </TabView>
    </section>
  );
};

export default ProjectSection;
