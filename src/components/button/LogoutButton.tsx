import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const LogoutButton = () => {
  const confirmLogout = () => {};

  const handleLogout = () => {
    confirmDialog({
      header: "Sign out",
      message: "Are you sure you want to sign out?",
      icon: "pi pi-warning",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: confirmLogout,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        className="flex justify-center w-full gap-2 font-semibold h-9"
        icon="pi pi-sign-out"
        severity="danger"
        onClick={handleLogout}
      >
        Sign out
      </Button>
    </>
  );
};

export default LogoutButton;
