import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
	schemaFile: "./swagger.json",
	apiFile: "./src/redux/apiSlices/api.ts",
	apiImport: "api",
	outputFile: "./src/redux/apiSlices/fullApi.ts",
	exportName: "fullApi",
	hooks: true,
};

export default config;