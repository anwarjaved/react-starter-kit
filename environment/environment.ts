export const BaseApiUrl = "https://localhost:44327";

export const TokenApiUrl = `${BaseApiUrl}/account/token`;

export const ProductName = String(process.env.PRODUCT);

export enum ApiEndpointType
{
	Auth ="Auth",
}