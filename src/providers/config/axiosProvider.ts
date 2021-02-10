import axios from "axios"

const axiosProvider = axios.create({
    baseURL: "https://api.xpto.ninja/v1"
})


export default axiosProvider;
