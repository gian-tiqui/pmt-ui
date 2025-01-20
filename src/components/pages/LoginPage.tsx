import PageTemplate from "../templates/PageTemplate";
import { PrimeIcons } from "primereact/api";

const LoginPage = () => {
  return (
    <PageTemplate>
      <div className="grid w-full h-screen place-content-center">
        <div className="flex flex-col items-center gap-3 text-center bg-white border rounded shadow-xl p-9 dark:border-black dark:bg-slate-950 w-96 dark:shadow-md dark:shadow-blue-500/30">
          <div className="grid border-2 shadow-xl w-14 h-14 dark:border-black place-content-center rounded-2xl">
            <i
              className={`${PrimeIcons.SIGN_IN} text-2xl text-black dark:text-white`}
            />
          </div>
          <h3 className="text-xl font-bold">Welcome back</h3>

          <h4 className="text-neutral-600">
            Manage your project timelines and activities here.
          </h4>
        </div>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
