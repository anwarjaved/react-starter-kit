interface SignupModel
{
	Name: string;
	Email: string;
	Password: string;
	Organization?: string;
	PersonalAccount: boolean;
}

interface CredentialModel
{
	access_token: string;
	refresh_token: string;
}

interface UserDto {
	Id: number;
	Email: string;
	Name: string;
	credentials: CredentialsModel
}

interface ResponseModel<T>
{
	readonly data: T;
	readonly errors?: { [key: string]: ReadonlyArray<string> } | null;
}