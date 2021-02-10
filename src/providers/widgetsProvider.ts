import axiosProvider from "./config/axiosProvider";

export const getWidgetsWithToken = async (token: string) => {
    return axiosProvider.get("/widgets", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}