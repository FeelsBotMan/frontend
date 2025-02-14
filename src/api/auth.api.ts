import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";
import { ROUTES } from "../constants/routes";

export const signup = async (userData: SignupProps) => {
    const response = await httpClient.post(ROUTES.SIGNUP, userData);
    return response.data;
};

export const resetRequest = async (data: SignupProps) => {
    const response = await httpClient.post(ROUTES.RESET_PASSWORD, data);
    return response.data;
};

export const resetPassword = async (data: SignupProps) => {
    const response = await httpClient.put(ROUTES.RESET_PASSWORD, data);
    return response.data;
};

interface LoginResponse {
    token: string;
}

export const login = async (data: SignupProps) => {
    const response = await httpClient.post<LoginResponse>(ROUTES.LOGIN, data);
    return response.data;
};