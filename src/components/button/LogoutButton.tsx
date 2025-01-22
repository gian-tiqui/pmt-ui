import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";
import { NAMESPACE } from "../../@utils/namespace/namespace";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../@utils/zustand/login";

const LogoutButton = () => {
  const logoutToastRef = useRef<Toast>(null);
  const navigate = useNavigate();
  const { setLoggedIn } = useLoginStore();

  const confirmLogout = () => {
    if (!accessAndRefreshTokensNotEmpty()) {
      alert("access tokens are empty.");
      return;
    }

    localStorage.removeItem(NAMESPACE);
    Cookies.remove(NAMESPACE);

    logoutToastRef.current?.show({
      severity: "info",
      summary: "Logout Successful",
    });

    setLoggedIn(false);

    navigate("/login");
  };

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
      <Toast ref={logoutToastRef} />
      <ConfirmDialog
        pt={{
          content: { className: "dark:bg-slate-900 dark:text-white" },
          header: { className: "dark:bg-slate-900 dark:text-white" },
          footer: { className: "dark:bg-slate-900 dark:text-white" },
        }}
      />
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
