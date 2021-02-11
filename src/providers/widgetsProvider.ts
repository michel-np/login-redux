import axiosProvider from "./config/axiosProvider";


const getConfig = (token: string) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
}


export const getWidgetsWithToken = async (token: string) => {
    return axiosProvider.get("/widgets", getConfig(token))
}

export const getWidgetsInCurrentPage = async (page: number, token: string) => {
    return axiosProvider.get(`/widgets/?page=${page}`, getConfig(token))
}