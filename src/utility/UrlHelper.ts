import { ApiEndpointType, BaseApiUrl } from "environment/environment";



export const getApiEndpoint = (endpoint: ApiEndpointType, subResource?: string): string => {
	let resourceUrl =  endpoint.indexOf("http") == -1 ? `${BaseApiUrl}/${endpoint}` : endpoint;

	if (subResource) {
		resourceUrl = `${resourceUrl}/${subResource}`;
	}

	return resourceUrl;
};