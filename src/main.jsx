import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "./router"
import UserProvider from "./context/UserContext"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router}></RouterProvider>
		</UserProvider>
	</React.StrictMode>
)
