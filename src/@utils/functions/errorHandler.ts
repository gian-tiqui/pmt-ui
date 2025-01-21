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
  }

  if (status === 400) {
    emailToastRef.current?.show({
      severity: "error",
      summary: err,
      detail: message,
    });
  }
};

export default handleError;
