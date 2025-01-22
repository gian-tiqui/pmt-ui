import { useEffect, useState } from "react";
import decodeAccessToken from "../../@utils/functions/decodeAccessToken";
import { PrimeIcons } from "primereact/api";
import RecentProjectCard from "../projectsection/components/RecentProjectCard";
import { useQuery } from "@tanstack/react-query";
import fetchUserProjects from "../../@utils/functions/fetchUserProjects";
import useProjectIdStore from "../../@utils/zustand/projectId";
import useSidebarSignalStore from "../../@utils/zustand/sidebarSignal";

const ProjectLandingSection = () => {
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const { setProjectId } = useProjectIdStore();
  const { sidebarSignal, setSidebarSignal } = useSidebarSignalStore();
  const SLICE_OFFSET: number = 0;
  const SLICE_AMOUNT: number = 5;

  const {
    data: projects,

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

  useEffect(() => {
    const populateUserData = async () => {
      try {
        const data = await decodeAccessToken();

        if (data) {
          setDisplayName(`${data.firstName}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    populateUserData();
  }, []);

  return (
    <section className="w-full h-screen col-span-9 px-20 pt-20 overflow-auto bg-inherit">
      <h4 className="mb-16 text-3xl font-medium text-center">
        Welcome back, <span className="text-blue-400">{displayName}</span>
      </h4>

      <div className="flex items-center gap-2 mb-3 text-neutral-800 dark:text-gray-400">
        <i className={`${PrimeIcons.CLOCK} text-sm`}></i>
        <p className="text-xs font-medium">Newly Added Projects</p>
      </div>

      <div className="flex items-center gap-2 mb-5">
        {projects?.slice(SLICE_OFFSET, SLICE_AMOUNT).map((project) => (
          <RecentProjectCard project={project} key={project.id} />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3 text-neutral-800 dark:text-gray-400">
        <i className={`${PrimeIcons.CLOCK} text-sm`}></i>
        <p className="text-xs font-medium">Recently Updated Projects</p>
      </div>

      <div className="flex items-center gap-2">
        {projects?.slice(SLICE_OFFSET, SLICE_AMOUNT).map((project) => (
          <RecentProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
};

export default ProjectLandingSection;
