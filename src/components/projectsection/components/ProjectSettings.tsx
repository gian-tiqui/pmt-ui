// change author, delete project, edit project details

import React, { useEffect, useRef, useState } from "react";
import { Project, UpdateProjectInfo } from "../../../types/types";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import decodeAccessToken from "../../../@utils/functions/decodeAccessToken";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { PrimeIcons } from "primereact/api";
import { useNavigate } from "react-router-dom";
import useSidebarSignalStore from "../../../@utils/zustand/sidebarSignal";
import apiClient, { API_URI } from "../../../@utils/http-common/http-common";
import { Toast } from "primereact/toast";

interface Props {
  project: Project | undefined;
}

const ProjectSettings: React.FC<Props> = ({ project }) => {
  const { register, handleSubmit, setValue } = useForm<UpdateProjectInfo>();
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);
  const { setSidebarSignal } = useSidebarSignalStore();
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const setProjectValues = () => {
      if (!project) return;

      setValue("name", project.name);
      setValue("description", project.description || "No description");

      decodeAccessToken()
        .then((data) => {
          setValue("authorId", data?.sub);
          setUserId(data?.sub);
        })
        .catch((err) => console.error(err));
    };

    setProjectValues();
  }, [project, setValue]);

  const handleUpdateProject = async (updateData: UpdateProjectInfo) => {
    console.log(updateData);
  };

  const handleDeleteProject = async () => {
    try {
      const deleteProjectResponse = await apiClient.delete(
        `${API_URI}/api/v1/project/${project?.id}?userId=${userId}`
      );

      console.log(deleteProjectResponse);

      setSidebarSignal(true);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectButtonClicked = async () => {
    confirmDialog({
      header: `Project Deletion`,
      message: "Are you sure you want to delete this project?",
      icon: "pi pi-warning",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: handleDeleteProject,
    });
  };

  return (
    <>
      <Toast ref={toastRef} />
      <ConfirmDialog
        pt={{
          content: { className: "dark:bg-slate-900 dark:text-white" },
          header: { className: "dark:bg-slate-900 dark:text-white" },
          footer: { className: "dark:bg-slate-900 dark:text-white" },
        }}
      />
      <section className="w-full">
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <div className="flex justify-between">
            <div>
              <h4 className="mb-2 text-2xl font-medium dark:text-gray-200">
                Project Settings
              </h4>
              <h5 className="font-medium text">
                Author:{" "}
                <span className="text-blue-400">{`${project?.author.firstName} ${project?.author.lastName}`}</span>
              </h5>
            </div>
            <Button
              onClick={deleteProjectButtonClicked}
              severity="danger"
              icon="pi pi-trash text-sm"
              className="w-8 h-8"
              type="button"
            ></Button>
          </div>

          <div className="flex flex-col items-center w-full pt-2">
            <div className="flex flex-col pt-5 w-96">
              <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                Required fields are marked with asterisk{" "}
                <span className="text-red-400">*</span>
              </p>

              <label htmlFor="projectNameInput" className="dark:text-gray-300">
                Project Name <span className="text-red-400">*</span>
              </label>
              <InputText
                id="projectNameInput"
                {...register("name", { required: true })}
                placeholder="Project name"
                className="mb-4 border bg-inherit dark:border-slate-700 dark:text-gray-200"
              />
              <label
                htmlFor="projectDescriptionInput"
                className="dark:text-gray-300"
              >
                Project Description
              </label>
              <InputTextarea
                id="projectDescriptionInput"
                {...register("description", { required: true })}
                className="mb-4 border bg-inherit dark:border-slate-700 dark:text-gray-200"
                placeholder="Project description"
              />
              <Button
                icon={`${PrimeIcons.SAVE}`}
                className="flex justify-center gap-2"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ProjectSettings;
