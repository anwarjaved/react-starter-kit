import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiEndpoint } from "@src/utility/UrlHelper";
import { cleanData } from "@src/utility/helper";
import axios from "axios";
import { ApiEndpointType, BaseApiUrl } from "environment/environment";

export const registerUser = createAsyncThunk(
	"user/login",
	async (model: SignupModel, thunkAPI) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				responseType: "json" as const,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				}
			};

			const url = getApiEndpoint(ApiEndpointType.Auth, "sign-up");
			console.dir(url);
			const { data } = await axios.post<IdentityResult>(
				`${url}`,
				cleanData(model),
				config
			);

			if (data.succeeded) {
				//hit profile endpoint
			}

			// store user's token in local storage
			//localStorage.setItem("userToken", data.userToken);

			return data as IdentityResult;
		} catch (error: any) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return thunkAPI.rejectWithValue(error.response.data.message);
			} else {
				return thunkAPI.rejectWithValue(error.message);
			}
		}
	}
);