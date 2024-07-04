
import { ThemeConfig } from "@src/constants";
import React, { Suspense } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { I18nextProvider } from "react-i18next";
import { Outlet } from "react-router";

import i18n from "@utility/i18n";




const App: React.FC = () => {

	return (
		<div id="app">
			App
			<Outlet />
		</div>

	);
};

export default App;