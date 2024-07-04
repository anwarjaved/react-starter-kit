import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "@src/components/LoginForm";
import App from "@src/components/App";
import RegisterForm from "@src/components/RegisterForm";
import ConfigService from "@src/services/ConfigService";

import * as TokenStorageService from "@src/services/TokenStorageService";
import PublicRoute from "./PublicRoute";
import SecureRoute from "./SecureRoute";


const isAuthorized = TokenStorageService.HasAccessToken() || TokenStorageService.HasRefreshToken();
export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<App />}>

				
			</Route>

		</Routes>
	);
};
