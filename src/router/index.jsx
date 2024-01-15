import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import LayoutPublic from "../layouts/LayoutPublic"
import NotFound from "../pages/NotFound"
import Contact from "../pages/Contact"
import Login from "../pages/LogIn"
import Singup from "../pages/SignUp"
import AnimeDetails from "../components/AnimeDetails"
import LayoutPrivate from "../layouts/LayoutPrivate"
import FavAnime from "../pages/FavAnime"
import UserProfile from "../pages/UserProfile"

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
          path: "/signup",
          element: <Singup />
        },
        {
          path: "/animeDetails/:animeId",
          element: <AnimeDetails />
        }
      ]
    },
    {
      path: "/",
      element: <LayoutPrivate />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/userProfile",
          element: <UserProfile />
        },
        {
          path: "/favAnime",
          element: <FavAnime />
        }
      ]
    }
  ]
)