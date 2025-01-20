import { Button } from "primereact/button";
import { useEffect, useState } from "react";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");

    if (storedMode === "true") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, [setIsDarkMode]);

  const toggleDarkMode = () => {
    const currentMode = document.documentElement.classList.contains("dark");

    if (currentMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("darkMode", "true");
    }
  };

  return (
    <Button
      icon={isDarkMode ? "pi pi-moon" : "pi pi-sun"}
      onClick={toggleDarkMode}
      className="text-black bg-gray-100 border-gray-300 rounded-lg dark:text-white dark:border-black dark:bg-slate-900 hover:border-blue-400 border-1 w-7 h-7"
    />
  );
};

export default DarkModeButton;
