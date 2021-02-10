export interface User {
    account: number;
    username: string;
    password: string;
    force?: number;
}

export interface UserTokenObtained {
    success: boolean;
    username: string;
    data: {
        token: string;
        fail?: string;
        message?: string;
    }
}

