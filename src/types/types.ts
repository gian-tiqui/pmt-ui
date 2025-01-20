import { ReactNode } from "react";

type RouteMap = {
  name: string;
  path: string;
  element: ReactNode;
  id?: string;
};

export type { RouteMap };
