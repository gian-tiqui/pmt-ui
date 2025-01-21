import { useQuery } from "@tanstack/react-query";
import useProjectIdStore from "../../@utils/zustand/projectId";
import fetchProjectById from "../../@utils/functions/fetchProjectById";

const ProjectSection = () => {
  const { projectId } = useProjectIdStore();

  const { data: project, isLoading } = useQuery({
    queryKey: [`project-${projectId}`],
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId,
  });

  if (!projectId)
    return (
      <section className="grid col-span-9 bg-inherit place-content-center">
        Select a project.
      </section>
    );

  if (isLoading)
    return (
      <section className="grid col-span-9 bg-inherit place-content-center">
        Project loading.
      </section>
    );

  return (
    <section className="grid col-span-9 bg-inherit place-content-center">
      {JSON.stringify(project)}
    </section>
  );
};

export default ProjectSection;
