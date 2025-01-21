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

type CreateProjectFormFields = {
  name: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  authorId: number;
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

type DecodeAccessToken = {
  sub: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  description: string;
  code: string;
};

export type {
  DecodeAccessToken,
  RouteMap,
  SignInFormFields,
  ForgotPasswordFields,
  Project,
  CreateProjectFormFields,
};
