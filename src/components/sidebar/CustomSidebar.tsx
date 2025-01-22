import { ScrollPanel } from "primereact/scrollpanel";
import { useQuery } from "@tanstack/react-query";
import fetchUserProjects from "../../@utils/functions/fetchUserProjects";
import React, { ReactNode, useEffect } from "react";
import useSidebarSignalStore from "../../@utils/zustand/sidebarSignal";
import SidebarSkeleton from "../skeleton/SidebarSkeleton";
import ProjectSectionSkeleton from "../skeleton/ProjectSectionSkeleton";
import useLoginStore from "../../@utils/zustand/login";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const CustomSidebar: React.FC<Props> = ({ children }) => {
  const { sidebarSignal, setSidebarSignal } = useSidebarSignalStore();
  const { loggedIn } = useLoginStore();
  const navigate = useNavigate();
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

  if (!loggedIn || !accessAndRefreshTokensNotEmpty()) return children;

  if (isLoading)
    return (
      <div className="flex w-full h-screen dark:text-white bg-inherit">
        <SidebarSkeleton />
        <ProjectSectionSkeleton />
      </div>
    );

  if (isError) {
    console.error(error);

    return <p>There was an error loading the projects</p>;
  }

  return (
    <div className="flex w-full h-screen bg-gray-100 dark:text-white dark:bg-slate-950">
      <div className="pt-20 border-r border-blue-400 w-80 ps-12">
        <h4 className="mb-1 text-sm font-medium">Recent Projects</h4>

        {projects?.slice(SLICE_OFFSET, SLICE_AMOUNT).map((project) => (
          <p
            className="hover:cursor-pointer"
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            {project.name}
          </p>
        ))}
        <h4 className="mt-4 mb-1 text-sm font-medium">Projects</h4>
        <ScrollPanel style={{ height: "35vh" }}>
          {projects?.slice(SLICE_AMOUNT).map((project) => (
            <p
              className="hover:cursor-pointer"
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {project.name}
            </p>
          ))}
        </ScrollPanel>
      </div>

      <div className="flex w-full px-4 pt-20">{children}</div>
    </div>
  );
};

export default CustomSidebar;
