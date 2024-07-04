import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseApiUrl } from "environment/environment";

const emptyApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({ baseUrl: BaseApiUrl }),
	endpoints: (builder) => ({}),
});


export default emptyApi;