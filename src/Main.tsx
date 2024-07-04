import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@src/routing/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const MOUNT_NODE: Element = document.getElementById("root") as HTMLElement;


const root = ReactDOM.createRoot(
	MOUNT_NODE
);
root.render(

	<BrowserRouter>
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	</BrowserRouter>

);
