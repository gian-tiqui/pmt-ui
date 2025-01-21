import { ScrollPanel } from "primereact/scrollpanel";
import useProjectIdStore from "../../@utils/zustand/projectId";
import { useQuery } from "@tanstack/react-query";
import fetchUserProjects from "../../@utils/functions/fetchUserProjects";
import { useEffect } from "react";
import useSidebarSignalStore from "../../@utils/zustand/sidebarSignal";

const CustomSidebar = () => {
  const { setProjectId } = useProjectIdStore();
  const { sidebarSignal, setSidebarSignal } = useSidebarSignalStore();
  const SLICE_OFFSET: number = 0;
  const SLICE_AMOUNT: number = 5;

  const {
    data: projects,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`user-projects`],
    queryFn: () =>
      fetchUserProjects(4, {
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
  });

  useEffect(() => {
    const refetchData = () => {
      refetch();
    };

    refetchData();

    return () => setSidebarSignal(false);
  }, [sidebarSignal, refetch, setSidebarSignal]);

  if (isLoading) return <p>Loading projects..</p>;

  if (isError) {
    console.error(error);

    return <p>There was an error loading the projects</p>;
  }

  return (
    <div className="h-screen col-span-3 px-12 pt-20 bg-inherit">
      <h4 className="mb-1 font-medium">Recent Projects</h4>

      {projects?.slice(SLICE_OFFSET, SLICE_AMOUNT).map((project) => (
        <p
          className="hover:cursor-pointer"
          key={project.id}
          onClick={() => setProjectId(project.id)}
        >
          {project.name}
        </p>
      ))}
      <h4 className="mt-4 mb-1 font-medium">Projects</h4>
      <ScrollPanel style={{ height: "35vh" }}>
        {projects?.slice(SLICE_AMOUNT).map((project) => (
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
  );
};

export default CustomSidebar;
