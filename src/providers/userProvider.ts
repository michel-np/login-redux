import axiosProvider from "./config/axiosProvider";
import { User } from "../interfaces/user"


const config: object = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

}

export const getToken = (payload: User) => {
    return axiosProvider.post('/users/token', payload, config);
}

export const validateToken = (token: string) => {
    return axiosProvider.get("/widgets",
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
}