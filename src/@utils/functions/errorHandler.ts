import { Toast } from "primereact/toast";
import { MutableRefObject } from "react";

const handleError = (
  error: unknown,
  emailToastRef: MutableRefObject<Toast | null>
) => {
  const {
    response: {
      data: { message, error: err },
    },
    status,
  } = error as {
    response: { data: { message: string; error: string } };
    status: number;
  };

  if (status === 404) {
    emailToastRef.current?.show({
      severity: "error",
      summary: err,
      detail: message,
    });
    return;
  }

  if (status === 400) {
    emailToastRef.current?.show({
      severity: "error",
      summary: err,
      detail: message,
    });
    return;
  }

  emailToastRef.current?.show({
    severity: "error",
    summary: err,
    detail: "There is a problem in the server. Please wait",
  });
};

export default handleError;
