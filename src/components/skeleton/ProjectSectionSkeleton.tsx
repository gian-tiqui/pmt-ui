import { Skeleton } from "primereact/skeleton";
import StatusCardSkeleton from "./StatusCardSkeleton";

const ProjectSectionSkeleton = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full">
        <Skeleton className="!w-52 !h-10 bg-neutral-300 dark:bg-slate-700 mb-4" />
        <div className="w-full bg-white rounded dark:bg-slate-900/40 h-96">
          <div className="flex items-center gap-5 pt-5 border-b-2 h-14 ps-4">
            <div className="flex gap-2">
              <Skeleton className="!w-6 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
              <Skeleton className="!w-24 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
            </div>
            <div className="hidden gap-2 md:flex">
              <Skeleton className="!w-6 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
              <Skeleton className="!w-24 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
            </div>
            <div className="hidden gap-2 md:flex">
              <Skeleton className="!w-6 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
              <Skeleton className="!w-24 !h-6 bg-neutral-300 dark:bg-slate-700 mb-4" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4">
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            <StatusCardSkeleton />
            <StatusCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSectionSkeleton;
