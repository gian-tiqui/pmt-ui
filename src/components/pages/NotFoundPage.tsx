import PageTemplate from "../templates/PageTemplate";

const NotFound = () => {
  return (
    <PageTemplate>
      <div className="grid w-full h-[100vh] place-content-center">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-400">
            <span className="text-black dark:text-white">404 | </span> Page not
            found
          </h1>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NotFound;
