import { Link, useNavigate } from "react-router-dom";
import hospitalFacede from "../../assets/wmc_facade.png";
import { Button } from "primereact/button";
import PageTemplate from "../templates/PageTemplate";
import { useEffect } from "react";
import accessAndRefreshTokensNotEmpty from "../../@utils/functions/accessAndRefreshTokensNotEmpty";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessAndRefreshTokensNotEmpty()) navigate("/projects");
  }, [navigate]);

  return (
    <PageTemplate>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex items-center justify-center flex-1">
          <div className="p-6 pt-12 lg:p-12">
            <h1 className="mb-4 text-3xl font-bold text-center text-blue-400 lg:text-5xl dark:text-neutral-0 lg:leading-normal lg:text-left">
              Lorem ipsum dolor sit <br />
              <span className="text-primary">consectetur adipiscing</span>
            </h1>
            <p className="mb-8 leading-normal text-center text-neutral-700 dark:text-neutral-200 lg:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center justify-center gap-6 lg:justify-start">
              <Link to={"login"}>
                <Button className="font-medium rounded-lg h-9">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <img
            src={hospitalFacede}
            alt="hero-1"
            className="w-full md:h-[100vh] bg-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
          />
        </div>
      </div>
    </PageTemplate>
  );
};

export default LandingPage;
