import { ReactNode } from "react";

type RouteMap = {
  name: string;
  path: string;
  element: ReactNode;
  id?: string;
  hidden: boolean;
};

type SignInFormFields = {
  email: string;
  password: string;
};

type ForgotPasswordFields = {
  email: string;
};

export type { RouteMap, SignInFormFields, ForgotPasswordFields };
