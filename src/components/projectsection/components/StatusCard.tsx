import { Card } from "primereact/card";

interface Props {
  icon: string;
  textContent: string;
  textDetail: string;
}

const StatusCard: React.FC<Props> = ({ icon, textContent, textDetail }) => {
  return (
    <Card className="border shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-blue-400">
      <div className="flex items-center gap-3">
        <div className="grid w-12 h-12 rounded place-content-center bg-neutral-200 dark:bg-slate-950">
          <i className={`${icon} dark:text-white`}></i>
        </div>
        <div>
          <h3 className="font-bold dark:text-gray-100">{textContent}</h3>
          <h3 className="text-sm dark:text-gray-200">{textDetail}</h3>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
