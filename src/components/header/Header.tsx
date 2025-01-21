import { Image } from "primereact/image";
import DarkModeButton from "../button/DarkModeButton";
import wmcLogo from "../../assets/wmc_logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";
import CustomAvatar from "../avatar/CustomAvatar";
import CreateProjectButton from "../button/CreateProjectButton";
import InboxButton from "../button/InboxButton";

const Header = () => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 flex items-center justify-between w-full h-16 px-12 bg-neutral-100/80 dark:bg-slate-950/80 backdrop-blur-md ${
        !isAtTop && "border-b dark:border-slate-800"
      }`}
    >
      <Link to={"/"} className="flex items-center justify-start gap-2">
        <Image
          alt="Westlake Medical Center"
          src={wmcLogo}
          className="w-8 h-8"
        />
        <div className="text-2xl font-bold tracking-tighter text-blue-400">
          WMC<span className="text-black dark:text-white">KANBAN</span>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <CreateProjectButton />
        <InboxButton />
        <DarkModeButton />

        {accessAndRefreshTokensNotEmpty() && <CustomAvatar />}
      </div>
    </header>
  );
};

export default Header;
