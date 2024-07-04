interface ReduxAction {
    type: string;
}

interface ReduxActionWithPayload<T> extends ReduxAction {
    payload: T;
}

interface EntityObject<T> {
    by: { [id: string]: T };
    all: (string | number)[];
}

interface IDispatch {
    (action: any): any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = 
  T & { children?: React.ReactNode };



interface BaseInputProps
{
    control: any;
}
interface AccessTokenResponse
{
    accessToken: string;
    expiredTime: string;
}

interface ReduxAction {
    type: string;
}

interface ReduxActionWithPayload<T> extends ReduxAction {
    payload: T;
}


interface IDispatch {
    (action: any): any;
}

interface NewAccount{
    name:string;
    email:string;
    organization?:string;
    isPersonalAccount?: boolean
}

interface ErrorData
{
    title?: string;
    errors?: any;
    error?: string;
    stackTrace?: string;
}

interface ResponseState {
    ok: boolean;
    data?: any | ErrorData;
    statusCode?: number;
}
interface UserInfo {
	EmailConfirmed?: boolean;
}


