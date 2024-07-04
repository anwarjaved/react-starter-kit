import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { AUTH_REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY } from "@src/constants";
export const HasAccessToken = (): boolean => {
	const hasToken = !!getAccessToken();
	return hasToken && !isTokenExpired();
};

export const HasRefreshToken = (): boolean => {
	const hasToken = !!getRefreshToken();
	return hasToken;
};

export const getAccessToken =(): string | null => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);
	return token;
};

export const getRefreshToken =(): string | null => {
	const token = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
	return token;
};

export const clearToken =(): void => {
	localStorage.removeItem(AUTH_TOKEN_KEY);
	localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
};

export const isTokenExpired = (): boolean => {
	const token = getAccessToken();

	if (token == null) {
		return true;
	}
	try {
		const { exp } = jwtDecode(token) as any;
		if (exp) {
			return dayjs.unix(exp).diff(dayjs()) < 1;
		}
	} catch (err) {
		return true;
	}
	return false;
};



export const saveToken = (user: CredentialModel) => {
	localStorage.setItem(AUTH_TOKEN_KEY, user.access_token);
	localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, user.refresh_token);
};