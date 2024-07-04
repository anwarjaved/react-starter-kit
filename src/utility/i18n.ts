import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { GlobalizationConfig } from "@src/constants";


i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: GlobalizationConfig.DefaultLocale,
		backend: {
			loadPath: "/locales/{{lng}}.json"
		},
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		react: {
			transSupportBasicHtmlNodes: true,
			transKeepBasicHtmlNodesFor: ["br", "strong", "i", "a", "p"]
		},
        
		load: "languageOnly",
		cache:  ["sessionStorage", "localStorage"]
	});

export const getLocaleText = (textKey?: string): string => textKey ?i18n.t(textKey, textKey) : "Empty";
export const setLocale =(language: string) => i18n.changeLanguage(language);
export default i18n;