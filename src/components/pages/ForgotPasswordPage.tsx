import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
import { useForm } from "react-hook-form";
import { ForgotPasswordFields } from "../../types/types";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";

const ForgotPasswordPage = () => {
  const { handleSubmit, register } = useForm<ForgotPasswordFields>();
  const emailToast = useRef<Toast>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessAndRefreshTokensNotEmpty()) navigate("/projects");
  }, [navigate]);

  const handleForgotPassword = async ({ email }: ForgotPasswordFields) => {
    if (!email.includes("@westlakemed.com.ph") && emailToast.current) {
      emailToast.current.show({
        severity: "error",
        summary: "Email invalid",
        detail: "The email must contain @westlakemed.com.ph",
      });

      return;
    }

    if (emailToast.current) {
      emailToast.current.show({
        severity: "info",
        summary: "Email sent",
        detail: `Email was sent to ${email}`,
      });

      return;
    }
  };

  return (
    <PageTemplate>
      <Toast ref={emailToast} />
      <div className="grid w-full h-screen place-content-center">
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex flex-col items-center gap-3 bg-white border rounded shadow-2xl p-9 dark:border-slate-800 dark:bg-slate-900/30 w-96 dark:shadow-md dark:shadow-blue-500/30"
        >
          <div className="grid border-2 shadow-xl w-14 h-14 dark:border-slate-800 place-content-center rounded-2xl">
            <i
              className={`${PrimeIcons.USER} text-2xl text-black dark:text-white`}
            />
          </div>
          <h3 className="text-xl font-bold dark:text-white">
            Forgot Password?
          </h3>

          <h4 className="text-center text-neutral-600 dark:text-neutral-500">
            Retrieve your account by entering your email here.
          </h4>
          <div className="flex flex-col w-full">
            <IconField iconPosition="left">
              <label
                htmlFor="emailInput"
                className="text-sm font-semibold text-blue-400"
              >
                Email
              </label>
              <InputIcon id="emailInput" className="mt-1 pi pi-envelope">
                {" "}
              </InputIcon>
              <InputText
                id="emailInput"
                {...register("email", { required: true })}
                placeholder="example@westlakemed.com.ph"
                className="w-full bg-inherit dark:border-slate-800"
              />
            </IconField>
          </div>
          <Link
            to={"/login"}
            className="w-full text-sm text-blue-400 hover:text-blue-600 hover:underline"
          >
            <p className="text-end">Go back?</p>
          </Link>
          <Button
            icon="pi pi-send"
            className="flex justify-center w-full gap-3 font-bold"
            type="submit"
          >
            Send email
          </Button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default ForgotPasswordPage;
