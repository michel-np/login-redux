export const GET_TOKEN_LOADING = "GET_TOKEN_LOADING";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS"
export const GET_TOKEN_FAIL = "GET_TOKEN_FAIL"
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export interface User {
    account: number;
    username: string;
    password: string;
    force?: number;
}

export interface UserTokenReturn {
    success: boolean;
    data: {
        token?: string;
        fail?: string;
        message?: string;
        code?: number;
    }
}

export interface UserTokenRefused {
    success: boolean;
    data: {
        message: string;
        url: string;
        code: number
    }
}


export interface GetTokenLoading {
    type: typeof GET_TOKEN_LOADING;
}

export interface GetTokenSuccess {
    type: typeof GET_TOKEN_SUCCESS;
    payload: UserTokenReturn;
}

export interface GetTokenFail {
    type: typeof GET_TOKEN_FAIL;
    payload: UserTokenRefused
}

export interface RemoveToken {
    type: typeof REMOVE_TOKEN;
}


export type UserDispatchTypes = GetTokenLoading | GetTokenSuccess | GetTokenFail | RemoveToken;
