import { EndpointBuilder } from "@reduxjs/toolkit/query";
import emptyApi from "@src/redux/apiSlices/emptyApi";


export const authEndpoints = (builder) => ({
	getUsers: builder.query({
		query: () => 'users',
	}),
	getUser: builder.query({
		query: (id) => `users/${id}`,
	}),
});