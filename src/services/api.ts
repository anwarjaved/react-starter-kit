import axios from "axios";
import { clearToken, getAccessToken, getRefreshToken, saveToken } from "./TokenStorageService";
import { BaseApiUrl, TokenApiUrl } from "environment/environment";

const API_BASE_URL = BaseApiUrl; // Replace with your API base URL

const api = axios.create({
	baseURL: API_BASE_URL,
});


api.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = getRefreshToken();
				const response = await axios.post(TokenApiUrl, { refreshToken }, {
					responseType: "json" as const,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				});
				const { token } = response.data;

				saveToken(token);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				// Handle refresh token error or redirect to login
				clearToken();
				window.location.reload();
			}
		}

		return Promise.reject(error);
	}
);

export default api;