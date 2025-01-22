import { Skeleton } from "primereact/skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="h-screen pt-20 border-r border-blue-400 w-80 ps-12">
      <h4 className="mb-1 text-sm font-medium">Recent Projects</h4>
      <div className="flex flex-col gap-2">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="!h-6 !w-36" />
          ))}
      </div>

      <h4 className="mt-4 mb-1 text-sm font-medium">Projects</h4>
      <div className="flex flex-col gap-2">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="!h-6 !w-36" />
          ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
