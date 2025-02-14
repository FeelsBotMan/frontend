import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";
import { ROUTES } from "../constants/routes";

export const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 10000;

const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken() ? getToken() : "",
        },
        withCredentials: true,
        ...config,
    });
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("error", error);
            //로그인 만료 처리
            if (error.response.status === 401) {
                removeToken();
                window.location.href = ROUTES.LOGIN;
                return;
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export const httpClient = createClient();


// 공통 요청 부분

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
    let response;

    switch (method) {
        case "get":
            response = await httpClient.get(url);
            break;
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
    }
    return response.data;
};