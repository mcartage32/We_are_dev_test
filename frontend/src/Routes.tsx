import { useRoutes} from "react-router-dom";
import Home from "./Home";


const Routes = () => {
  
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/registration",
    //   element: <Registration />,
    // },
    // {
    //   path: "/create",
    //   element: <CreateTask />,
    // },
  ]);
};

export default Routes;
