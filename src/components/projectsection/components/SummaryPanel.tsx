import { Project } from "../../../types/types";
import StatusCard from "./StatusCard";

interface Props {
  project: Project | undefined;
}

const SummaryPanel: React.FC<Props> = (project) => {
  console.log(project);

  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatusCard
          icon="pi pi-check-circle"
          textContent={`0 Completed`}
          textDetail={`In the last 7 days`}
        />{" "}
        <StatusCard
          icon="pi pi-check-circle"
          textContent={`0 Updated`}
          textDetail={`In the last 7 days`}
        />{" "}
        <StatusCard
          icon="pi pi-check-circle"
          textContent={`0 Completed`}
          textDetail={`In the last 7 days`}
        />{" "}
        <StatusCard
          icon="pi pi-check-circle"
          textContent={`0 Due`}
          textDetail={`In the next 7 days`}
        />
      </div>
      <div className="grid grid-cols-2 gap-6"></div>
    </section>
  );
};

export default SummaryPanel;
