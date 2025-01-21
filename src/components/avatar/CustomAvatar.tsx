import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import LogoutButton from "../button/LogoutButton";

const CustomAvatar = () => {
  const overlayPanelRef = useRef<OverlayPanel>(null);

  return (
    <div>
      <Avatar
        label="J"
        className="font-bold bg-blue-400 border border-gray-300 dark:text-white dark:border-slate-700"
        shape="circle"
        onClick={(event) => overlayPanelRef.current?.toggle(event)}
      />
      <OverlayPanel
        ref={overlayPanelRef}
        className="w-64 bg-white border shadow-xl dark:bg-slate-900 dark:shadow-blue-500/20"
      >
        <Divider />
        <LogoutButton />
      </OverlayPanel>
    </div>
  );
};

export default CustomAvatar;
