
class ConfigServiceInstance {

	public readonly ExtenalLoginEnabled: boolean = false;
	public readonly GoogleLoginEnabled: boolean = true;
	public readonly FacebookLoginEnabled: boolean = true;
}

const ConfigService = new ConfigServiceInstance();

export default ConfigService;
