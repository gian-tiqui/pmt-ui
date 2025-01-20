import React, { ReactNode } from "react";
import Header from "../header/Header";

interface PageTemplateType {
  children?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
  return (
    <div className="w-full bg-gray-100 dark:bg-slate-950">
      <Header />
      {children}
    </div>
  );
};

export default PageTemplate;
