import emptyApi from "./emptyApi";


const accountApi = emptyApi.injectEndpoints({
	endpoints: (builder) => ({
	}),
});

export default accountApi;