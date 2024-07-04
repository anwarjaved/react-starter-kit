import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocale } from "@utility/i18n";
import { ThemeConfig, GlobalizationConfig } from "@src/constants";
import { RootState } from "../store";




interface UIState
 {
	theme : "light" | "dark" | string;
	locale: string;
	direction: "ltr" | "rtl" | string;
	navCollapsed: boolean;
	loading: boolean;
	
}

const initialState : UIState = {
	theme: ThemeConfig.DefaultTheme,
	locale: GlobalizationConfig.DefaultLocale,
	direction: ThemeConfig.DefaultDirection,
	navCollapsed: false,
	loading: false
};


const UISlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
	  
	  changeTheme(state, action: PayloadAction<"light" | "dark">) {
			state.theme = action.payload;
	  },
	  changelocale(state, action: PayloadAction<string>) {
			setLocale(action.payload);
			state.locale = action.payload;
	  },
	  toggleNav(state) {
			state.navCollapsed = !state.navCollapsed;
	  },
	  toggleLoading(state) {
			state.loading = !state.loading;
		}
	},
});

export const { changeTheme, changelocale, toggleNav, toggleLoading } = UISlice.actions;
export default UISlice;

export const UISelector = (state: RootState) => state.ui;