import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import Series from "./screens/Series";
import Search from "./screens/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "series",
        element: <Series />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movies/:movieId",
        element: <Home />,
      },
    ],
  },
]);
