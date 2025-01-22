import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

const StatusCardSkeleton = () => {
  return (
    <Card className="border shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-blue-400">
      <div className="flex items-center gap-3">
        <Skeleton className="!w-12 !h-12 bg-neutral-300 dark:bg-slate-700" />
        <div>
          <Skeleton className="!w-32 !h-4 mb-2 bg-neutral-300 dark:bg-slate-700" />
          <Skeleton className="!w-32 !h-4 bg-neutral-300 dark:bg-slate-700" />
        </div>
      </div>
    </Card>
  );
};

export default StatusCardSkeleton;
