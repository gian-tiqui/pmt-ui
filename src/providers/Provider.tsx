import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouteProvider from "../routes/RouteProvider";
import CustomSidebar from "../components/sidebar/CustomSidebar";

const Provider = () => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CustomSidebar>
          <RouteProvider />
        </CustomSidebar>
      </QueryClientProvider>
    </div>
  );
};

export default Provider;
