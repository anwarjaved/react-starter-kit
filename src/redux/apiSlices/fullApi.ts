import { api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAccount: build.query<GetAccountApiResponse, GetAccountApiArg>({
			query: () => ({ url: "/Account" }),
		}),
		getFauxImageByPlacerArgs: build.query<
			GetFauxImageByPlacerArgsApiResponse,
			GetFauxImageByPlacerArgsApiArg
		>({
			query: (queryArg) => ({
				url: `/FauxImage/${queryArg.placerArgs}`,
				params: { text: queryArg.text },
			}),
		}),
		getSlackAuthorize: build.query<
			GetSlackAuthorizeApiResponse,
			GetSlackAuthorizeApiArg
		>({
			query: () => ({ url: "/Slack/authorize" }),
		}),
		getSlackCallback: build.query<
			GetSlackCallbackApiResponse,
			GetSlackCallbackApiArg
		>({
			query: (queryArg) => ({
				url: "/Slack/callback",
				params: {
					state: queryArg.state,
					code: queryArg.code,
					error: queryArg.error,
				},
			}),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as fullApi };
export type GetAccountApiResponse = unknown;
export type GetAccountApiArg = void;
export type GetFauxImageByPlacerArgsApiResponse = unknown;
export type GetFauxImageByPlacerArgsApiArg = {
	placerArgs: string;
	text?: string;
};
export type GetSlackAuthorizeApiResponse = unknown;
export type GetSlackAuthorizeApiArg = void;
export type GetSlackCallbackApiResponse = unknown;
export type GetSlackCallbackApiArg = {
	state?: string;
	code?: string;
	error?: string;
};
export const {
	useGetAccountQuery,
	useGetFauxImageByPlacerArgsQuery,
	useGetSlackAuthorizeQuery,
	useGetSlackCallbackQuery,
} = injectedRtkApi;
