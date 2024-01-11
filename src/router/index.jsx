import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import LayoutPublic from "../layouts/LayoutPublic"
import NotFound from "../pages/NotFound"
import Contact from "../pages/Contact"
import Login from "../pages/LogIn"
import Singup from "../pages/SingUp"
import AnimeDetails from "../components/AnimeDetails"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutPublic />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/singup",
          element: <Singup />
        },
        {
          path: "/animeDetails/:animeId",
          element: <AnimeDetails />
        }
      ]
    }
  ]
)