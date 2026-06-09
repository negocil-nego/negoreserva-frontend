import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { PUBLIC_APP_URL } from "$env/static/public";
import { browser } from "$app/environment";
import { USER_AUTH_TOKEN_KEY } from "$lib/data/variables";
import { redirectToLogin } from "$lib/data/utils";

export const axiosClient = axios.create({
    baseURL: PUBLIC_APP_URL,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = browser ? localStorage.getItem(USER_AUTH_TOKEN_KEY) : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            redirectToLogin();
        }
        return Promise.reject(error);
    }
);