import { Project } from "../../../types/types";

interface Props {
  project: Project | undefined;
}

const SummaryPanel: React.FC<Props> = (project) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-6 mb-6"></div>
      <div className="grid grid-cols-2 gap-6"></div>
    </section>
  );
};

export default SummaryPanel;
