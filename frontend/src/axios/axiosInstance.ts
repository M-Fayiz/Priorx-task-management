import type { AxiosInstance } from "axios"
import axios from "axios"


const createInstace=():AxiosInstance=>{
    const instance=axios.create({
       baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1/`,
        withCredentials: true,
    })
}

