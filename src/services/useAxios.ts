import {BASE_URL} from "../config/api";
import {useEffect} from "react";
import useBackdrop from "../context/useBackdrop";
import axios from 'axios';
import {useSnackbar} from "../context/useSnackbar";

const baseArgs = {
    baseURL: BASE_URL,
    withCredentials: true
}

export const defaultAxios = axios.create({...baseArgs});

const useAxios = () => {

    const {openSnackbar, closeSnackbar} = useSnackbar();
    const {backdropOpen, openBackdrop, closeBackdrop} = useBackdrop();
    const axiosInstance = axios.create({...baseArgs});

    useEffect(() => {

        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                openBackdrop();
                return config;
            },
            (error) => {
                closeBackdrop();
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                closeBackdrop();
                return response;
            },
            (error) => {
                closeBackdrop();
                if (error.response) {
                    const errStatus = error.response.status;
                    if (errStatus === 400) {
                        const errData = error.response.data;
                        if (Array.isArray(errData)) {
                            errData.forEach((error) => {
                                openSnackbar(error, 'error');
                            });
                        } else if (typeof errData === 'object' && errData !== null) {
                            Object.keys(errData).forEach((fieldName) => {
                                const messages = errData[fieldName];
                                const combinedMessage = messages.join(', ');
                                openSnackbar(`${fieldName}: ${combinedMessage}`, 'error');
                            });
                        } else {
                            // 处理其他类型的 errData
                            console.error('Invalid errData format:', errData);
                        }
                        return Promise.reject(error)
                    } else if (errStatus === 401) {
                        // 如果响应状态码是 401，执行重定向到登录页面的操作
                        openSnackbar('Unauthorized', "error");
                    } else if (errStatus === 403) {
                        openSnackbar('You have no permission', 'warning')
                    } else if (errStatus === 404) {
                        openSnackbar('Not found', 'warning')
                    } else if (errStatus >= 500) {
                        openSnackbar('Server error', 'error')
                    } else {
                        // openSnackbar(error.response.data.detail, 'error')
                    }
                    return Promise.reject(error); // 返回一个被拒绝的 Promise，以便在调用方处理
                } else {
                    if (error.code === 'ERR_NETWORK') {
                        console.log('ERR_NETWORK')
                        openSnackbar('Network error', "error");
                    } else {
                        openSnackbar('System error', 'error')
                    }
                }
                // 处理其他响应错误
                return Promise.reject(error);
            }
        );

        return () => {
            // 清理拦截器
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [
        openSnackbar,
        closeSnackbar,
        closeBackdrop,
        closeSnackbar,
        openBackdrop,
        axiosInstance.interceptors.request,
        axiosInstance.interceptors.response
    ]);

    return {backdropOpen, axiosInstance};
}

export default useAxios;
