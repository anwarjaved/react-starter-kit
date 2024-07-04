import emptyApi from "./emptyApi";
import {authApi} from "./authApi";

const api = emptyApi.injectEndpoints({
	endpoints: (builder) => ({
	}),
});

export default api;