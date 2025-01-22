import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProjectFormFields } from "../../types/types";
import decodeAccessToken from "../../@utils/functions/decodeAccessToken";
import { InputTextarea } from "primereact/inputtextarea";
import apiClient, { API_URI } from "../../@utils/http-common/http-common";
import useSidebarSignalStore from "../../@utils/zustand/sidebarSignal";

const CreateProjectButton = () => {
  const [counter, setCounter] = useState<number>(10);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const toastRef = useRef<Toast>(null);
  const intervalRef = useRef<number | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<CreateProjectFormFields>();
  const { setSidebarSignal } = useSidebarSignalStore();

  useEffect(() => {
    if (disabled) {
      setCounter(10);

      intervalRef.current = window.setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 1) {
            return prevCounter - 1;
          } else {
            clearInterval(intervalRef.current!);
            setDisabled(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [disabled]);

  const handleCreateProject = async ({
    description,
    name,
  }: CreateProjectFormFields) => {
    setLoading(true);
    await decodeAccessToken()
      .then((data) => {
        if (data?.sub) setValue("authorId", data?.sub);
      })
      .catch((err) => console.error(err));

    try {
      const response = await apiClient.post(`${API_URI}/api/v1/project`, {
        name,
        description,
        authorId: getValues("authorId"),
      });

      if (response.status === 201) {
        setSidebarSignal(true);

        toastRef.current?.show({
          summary: "Project Created",
          severity: "success",
        });
      }
    } catch (error) {
      const {
        status,
        response: {
          data: { message },
        },
      } = error as {
        response: { data: { message: string; error: string } };
        status: number;
      };

      if (status === 429) {
        toastRef.current?.show({
          severity: "error",
          summary: "Please wait",
          detail: message,
        });

        setDisabled(true);

        return;
      }
    } finally {
      setLoading(false);
      setVisible(false);
      reset();
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Dialog
        visible={visible}
        header="Create a project"
        className="w-96"
        pt={{
          header: {
            className:
              "bg-gray-100 dark:bg-slate-900 text-black dark:text-white",
          },
          content: {
            className:
              "bg-gray-100 dark:bg-slate-900 text-black dark:text-white",
          },
          footer: {
            className:
              "bg-gray-100 dark:bg-slate-900 text-black dark:text-white",
          },
          closeButton: {
            className:
              "hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-white",
          },
        }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <div className="flex flex-col w-full gap-1">
            <div>
              <label
                htmlFor="projectNameInput"
                className="text-sm font-semibold text-blue-400"
              >
                Title
              </label>
              <IconField id="projectNameInput" iconPosition="left">
                <InputIcon className="pi pi-info"></InputIcon>
                <InputText
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="WMC Project"
                  className="w-full text-black bg-inherit dark:border-slate-800 dark:text-white dark:hover:border-blue-400"
                />
              </IconField>
              {errors.name && (
                <small className="text-red-500 ps-1">
                  Project name is required
                </small>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="projectDescriptionInput"
                className="text-sm font-semibold text-blue-400"
              >
                Description
              </label>
              <IconField id="projectDescriptionInput" iconPosition="left">
                <InputIcon className="pi pi-align-justify"></InputIcon>
                <InputTextarea
                  {...register("description", { required: false })}
                  placeholder="This project is intended for..."
                  className="w-full text-black bg-inherit dark:border-slate-800 dark:text-white dark:hover:border-blue-400"
                />
              </IconField>
              {errors.description && (
                <small className="text-red-500 ps-1">
                  {errors.description?.message}
                </small>
              )}
            </div>
          </div>

          <Button
            disabled={disabled || loading}
            icon={loading ? "pi pi-spinner pi pi-spin" : "pi pi-plus"}
            className="flex justify-center w-full gap-3 font-bold"
            type="submit"
          >
            {disabled ? counter : "Create Project"}
          </Button>
        </form>
      </Dialog>
      <Button
        className="flex justify-center w-40 h-8 text-sm font-medium"
        icon="pi pi-plus mr-2"
        onClick={() => setVisible(true)}
      >
        Create Project
      </Button>
    </>
  );
};

export default CreateProjectButton;
