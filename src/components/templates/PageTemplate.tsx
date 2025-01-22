import React, { ReactNode } from "react";

interface PageTemplateType {
  children?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
  return <div className="w-full bg-gray-100 dark:bg-slate-950">{children}</div>;
};

export default PageTemplate;
