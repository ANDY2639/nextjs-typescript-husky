import AccessTokenService from "@/domain/services/AccessTokenService";
import axios from "axios";
import { getError } from "./errorMap";
import MfaTokenService from "@/domain/services/MfaTokenService";
import AccessToken from "@/domain/entity/Token/AccessToken";


const axPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'xdtoken',
    xsrfHeaderName: 'xdtoken',
    headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY
    }
})

axPrivate.interceptors.request.use(
    async (config) => {
        const token = await AccessTokenService.getToken();
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token.accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

let isRefreshing = false;
let refreshSubscribers: ((token: AccessToken) => void)[] = [];
let refreshAttempts = 0;

axPrivate.interceptors.response.use(
    undefined,
    error =>{
        const { config, response: { status } } = error;
        const originalRequest = config;
        if (status === 401) {
            if(config.url.includes('refresh-token')){
                clearTokensAndRedirectToLogin()
            }

            if (!isRefreshing) {
                isRefreshing = true;
                refreshToken().then((newToken: AccessToken) => {
                  isRefreshing = false;
                  onRefreshed(newToken);
                  refreshSubscribers = [];
                }).catch(() => {
                  clearTokensAndRedirectToLogin();
                });
            }

            refreshAttempts++;

            if (refreshAttempts >= 6) {
                clearTokensAndRedirectToLogin();
                return Promise.reject(error);
            }

            return new Promise(resolve => {
                subscribeTokenRefresh((token: AccessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
                    resolve(axPrivate(originalRequest));
                });
            });
        }

        const mappedError = getError(error);
        return mappedError ? Promise.reject(mappedError) : Promise.reject(error);
    }
)

let isLoggedOut = false;

async function clearTokensAndRedirectToLogin() {
    if (!isLoggedOut) {
        isLoggedOut = true;
        await MfaTokenService.clearToken();
        window.location.href = '/';
    }
}

function subscribeTokenRefresh(cb: (token: AccessToken) => void): void{
    refreshSubscribers.push(cb);
}

function onRefreshed(token: AccessToken) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshAttempts = 0;
}

function refreshToken() {
   return new Promise<AccessToken>(() => {})
}

export default axPrivate