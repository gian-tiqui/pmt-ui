import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Playground from "./playground/Playground";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:8082/api/v1/comment");

      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Playground />
    </div>
  );
};

export default App;
