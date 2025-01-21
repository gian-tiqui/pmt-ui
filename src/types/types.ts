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

type Project = {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type { RouteMap, SignInFormFields, ForgotPasswordFields, Project };
