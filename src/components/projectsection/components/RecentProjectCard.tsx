import { Fieldset } from "primereact/fieldset";
import { Project } from "../../../types/types";

interface Props {
  project: Project;
}

const RecentProjectCard: React.FC<Props> = ({ project }) => {
  const legendTemplate = (
    <div className="flex items-center gap-2">
      <span className="text-sm font-extrabold">{project.name}</span>
    </div>
  );

  return (
    <Fieldset
      className="h-36 w-44 hover:cursor-pointer "
      legend={legendTemplate}
      pt={{
        legend: {
          className:
            "ms-2 h-14 flex dark:text-white items-center dark:bg-slate-900 w-[90%] dark:border-slate-700",
        },
        root: {
          className:
            "dark:bg-slate-900  dark:border-slate-700 dark:text-white hover:shadow-lg dark:hover:shadow-sm dark:hover:shadow-blue-400",
        },
      }}
    >
      <p className="m-0 text-sm font-medium">
        {project.description || "No project description."}
      </p>
    </Fieldset>
  );
};

export default RecentProjectCard;
