import { GlobalizationConfig } from "@src/constants";

export function getLocale() {
	//const nav: any = navigator;
	//const locale = nav.languages ? nav.languages[0] : nav.language ? nav.language : nav.browserLanguage || DEFAULT_LOCALE;

	//return SUPPORTED_LANGUAGES.find(r => r === locale) || DEFAULT_LOCALE;
	return GlobalizationConfig.DefaultLocale;
}
