import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import LayoutPublic from "../layouts/LayoutPublic"
import NotFound from "../shared/NotFound"
import Contact from "../pages/Contact"
import Login from "../pages/LogIn"
import Signup from "../pages/SignUp"
import AnimeDetails from "../pages/AnimeDetails"
import LayoutPrivate from "../layouts/LayoutPrivate"
import Favorites from "../pages/Favorites"
import UserProfile from "../pages/UserProfile"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutPublic />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/animeDetails/:animeId",
				element: <AnimeDetails />,
			},
		],
	},
	{
		path: "/",
		element: <LayoutPrivate />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/userProfile",
				element: <UserProfile />,
			},
			{
				path: "/favorites",
				element: <Favorites />,
			},
		],
	},
])
