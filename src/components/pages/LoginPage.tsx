import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import PageTemplate from "../templates/PageTemplate";
import { PrimeIcons } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { SignInFormFields } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import axios from "axios";
import { API_URI } from "../../@utils/http-common/http-common";
import handleError from "../../@utils/functions/errorHandler";
import { NAMESPACE } from "../../@utils/namespace/namespace";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(10);
  const { handleSubmit, register } = useForm<SignInFormFields>();
  const emailToastRef = useRef<Toast>(null);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessAndRefreshTokensNotEmpty()) navigate("/projects");
  }, [navigate]);

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

  const handleLogin = async ({ email, password }: SignInFormFields) => {
    setLoading(true);

    if (!email.includes("@westlakemed.com.ph")) {
      emailToastRef.current?.show({
        severity: "error",
        summary: "Email invalid",
        detail: "Email must be from the WMC",
      });

      setLoading(false);

      return;
    }

    try {
      const loginResponse = await axios.post(`${API_URI}/api/v1/auth/login`, {
        email,
        password,
      });

      if (emailToastRef.current && loginResponse.status === 201) {
        emailToastRef.current.show({
          severity: "info",
          summary: "Login Successful",
        });

        const { accessToken, refreshToken } = loginResponse.data.tokens;

        if (accessToken && refreshToken) {
          localStorage.setItem(NAMESPACE, accessToken);
          Cookies.set(NAMESPACE, refreshToken);

          navigate("/projects");
        }
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
        emailToastRef.current?.show({
          severity: "error",
          summary: "Please wait",
          detail: message,
        });

        setDisabled(true);

        return;
      }

      handleError(error, emailToastRef);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate>
      <Toast
        ref={emailToastRef}
        pt={{ content: { className: "h-full backdrop-blur" } }}
      />
      <div className="grid w-full h-screen place-content-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center gap-3 bg-white border rounded shadow-2xl p-9 dark:border-slate-800 dark:bg-slate-900/40 w-96 dark:shadow-md dark:shadow-blue-500/30"
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
          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="emailInput"
              className="text-sm font-semibold text-blue-400"
            >
              Email
            </label>
            <IconField id="emailInput" iconPosition="left">
              <InputIcon className="pi pi-envelope"></InputIcon>
              <InputText
                id="emailInput"
                {...register("email", { required: true })}
                placeholder="example@westlakemed.com.ph"
                className="w-full text-black bg-inherit dark:border-slate-800 dark:text-white dark:hover:border-blue-400"
              />
            </IconField>

            <label
              htmlFor="passwordInput"
              className="text-sm font-semibold text-blue-400"
            >
              Password
            </label>
            <IconField id="passwordInput" iconPosition="left">
              <InputIcon id="passwordInput" className="pi pi-lock"></InputIcon>
              <InputText
                {...register("password", { required: true })}
                placeholder="*********"
                className="w-full text-black bg-inherit dark:border-slate-800 dark:text-white dark:hover:border-blue-400"
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
            disabled={disabled}
            icon={loading ? "pi pi-spinner pi pi-spin" : "pi pi-user"}
            className="flex justify-center w-full gap-3 font-bold"
            type="submit"
          >
            {disabled ? counter : "Sign in"}
          </Button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
