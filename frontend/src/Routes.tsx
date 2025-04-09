import { useRoutes} from "react-router-dom";
import Home from "./Home";


const Routes = () => {
  
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
};

export default Routes;
