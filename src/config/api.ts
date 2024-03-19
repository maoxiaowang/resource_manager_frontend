export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = {
    auth: {
        obtainToken: '/auth/token/obtain/',
        destroyToken: '/auth/token/destroy/',
        refreshToken: '/auth/token/refresh/',
        whoami: '/auth/whoami/',
    }
};
export default API;
