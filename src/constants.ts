export const Production = process.env.NODE_ENV === "production";



export const GlobalizationConfig = {
	DefaultLocale : "en"
};

export const ROW_GUTTER = 16;
export const SIDE_NAV_WIDTH = 250;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;
export const SIDE_NAV_LIGHT = "SIDE_NAV_LIGHT";
export const SIDE_NAV_DARK = "SIDE_NAV_DARK";
export const NAV_TYPE_SIDE = "SIDE";
export const NAV_TYPE_TOP = "TOP";
export const DIR_LTR = "ltr";
export const DIR_RTL = "rtl";
export const AUTH_TOKEN_KEY = "access_token";
export const AUTH_REFRESH_TOKEN_KEY = "refresh_token";

export const ThemeConfig = {
	DefaultTheme:  "light",
	Themes:  {
		dark: "/css/dark-theme.css",
		light: "/css/light-theme.css",
	},
	NavCollapsedWidth: 80,
	NavWidth: 250,
	DefaultDirection: DIR_LTR,
	ShowLogoOnMobile: true
};





