import { merge } from "./immutable";
import i18n from "@src/utility/i18n";
const uniqueIds: any = {};

import React from "react";
function getNextId(ident = "id") {
	if (!uniqueIds[ident]) {
		uniqueIds[ident] = { id: ident, idCounter: 0 };
	}

	uniqueIds[ident].idCounter = uniqueIds[ident].idCounter + 1;

	return [uniqueIds[ident].id, uniqueIds[ident].idCounter].join("-");
}


function getUserFromState(): any {
	const item = localStorage.getItem("user");

	if (item) {
		try {
			const userState = JSON.parse(item);

			return merge({ isAuthenticated: false }, userState);
		} catch (error) { /* empty */ }
	}

	return { isAuthenticated: false };
}

function getErrorMessage(fieldName: string, message: string) {
	const {t} = i18n;
	if (message.indexOf("_") == -1) {
		return t(message, { Field: convertToPascalCase(fieldName) }) || message;
	}
	const arr = message.split("_");
	const lastValue = arr[arr.length - 1];
	const [firstValue] = arr;


	if (lastValue.endsWith("LEN")) {
		const key = `${arr[1]}_${arr[2]}`;
		return t(key, { Field: convertToPascalCase(fieldName), Length: firstValue });
	}

	return "";
}

function convertToPascalCase(s: string) {
	s = s.replace(/([A-Z])/g, " $1").trim();
	s = s.replace(/\w+/g,
		(w) => w[0].toUpperCase() + w.slice(1));
	return s;
}

const replaceUndefinedOrNull = (key: unknown, value: unknown) => 
{
	if (value === null || value === undefined) {
		return undefined;
	  }
	
	  return value;
};

const cleanData = (obj: unknown) => {
	return JSON.parse(JSON.stringify(obj, replaceUndefinedOrNull));
};

export {
	getNextId,
	getUserFromState,
	getErrorMessage,
	cleanData
};