import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import PageTemplate from "../templates/PageTemplate";
import { PrimeIcons } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { SignInFormFields } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";
import { NAMESPACE } from "../../@utils/namespace/namespace";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import axios from "axios";
import { API_URI } from "../../@utils/http-common/http-common";

const LoginPage = () => {
  const { handleSubmit, register } = useForm<SignInFormFields>();
  const emailToast = useRef<Toast>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessAndRefreshTokensNotEmpty()) navigate("/projects");
  }, [navigate]);

  const handleLogin = async ({ email, password }: SignInFormFields) => {
    const loginResponse = await axios.post(`${API_URI}/api/v1/auth/login`, {
      email,
      password,
    });

    console.log(loginResponse.data);

    if (!email.includes("@westlakemed.com.ph") && emailToast.current) {
      emailToast.current.show({
        severity: "error",
        summary: "Email invalid",
        detail: "The email must contain @westlakemed.com.ph",
      });

      return;
    }

    if (
      email !== "jessareforma@westlakemed.com.ph" &&
      password !== "abcd_123" &&
      emailToast.current
    ) {
      emailToast.current.show({
        severity: "error",
        summary: "User does not exist",
        detail: "Please enter your credentials again.",
      });

      return;
    }

    if (emailToast.current) {
      emailToast.current.show({
        severity: "info",
        summary: "Login Successful",
      });

      localStorage.setItem(NAMESPACE, NAMESPACE);
      Cookies.set(NAMESPACE, NAMESPACE);

      navigate("/projects");
    }
  };

  return (
    <PageTemplate>
      <Toast ref={emailToast} />
      <div className="grid w-full h-screen place-content-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center gap-3 bg-white border rounded shadow-2xl p-9 dark:border-slate-800 dark:bg-slate-900/30 w-96 dark:shadow-md dark:shadow-blue-500/30"
        >
          <div className="grid border-2 shadow-xl w-14 h-14 dark:border-slate-800 place-content-center rounded-2xl">
            <i
              className={`${PrimeIcons.SIGN_IN} text-2xl text-black dark:text-white`}
            />
          </div>
          <h3 className="text-xl font-bold dark:text-white">Welcome back</h3>

          <h4 className="text-center text-neutral-600 dark:text-neutral-500">
            Manage the project timelines and activities here.
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
                className="w-full bg-inherit dark:border-slate-800 dark:hover:border-blue-400"
              />
            </IconField>

            <IconField iconPosition="left">
              <label
                htmlFor="passwordInput"
                className="text-sm font-semibold text-blue-400"
              >
                Password
              </label>
              <InputIcon id="passwordInput" className="mt-1 pi pi-lock">
                {" "}
              </InputIcon>
              <InputText
                id="passwordInput"
                {...register("password", { required: true })}
                placeholder="*********"
                className="w-full bg-inherit dark:border-slate-800 dark:hover:border-blue-400"
                type="password"
              />
            </IconField>
          </div>
          <Link
            to={"/forgot-password"}
            className="w-full text-sm text-blue-400 hover:text-blue-600 hover:underline"
          >
            <p className="text-end">Forgot password?</p>
          </Link>
          <Button
            icon="pi pi-user"
            className="flex justify-center w-full gap-3 font-bold"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
