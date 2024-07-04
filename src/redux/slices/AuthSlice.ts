import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as TokenStorageService from "@src/services/TokenStorageService";
import { registerUser } from "../actions/authActions";
import { RootState } from "../store";

const initialState : UserState = {
	loading: "idle"
};


const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
		 TokenStorageService.clearToken(); // delete token from storage
		  state.userInfo = null;
		  state.errors = null;
		},
		setCredentials: (state, { payload }) => {
		  state.userInfo = payload;
		},
	  },
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state, action) => {
			state.loading = "pending";
			state.errors = null;
		  }).addCase(registerUser.fulfilled, (state, { payload }) => {
			state.loading = "succeeded"; // registration successful
		  })
		  .addCase(registerUser.rejected, (state, { payload }) => {
				state.loading = "failed"; // registration successful
				state.errors = payload as any;
		  });
	},
});

export default AuthSlice;

export const AuthSelector = (state: RootState) => state.auth;