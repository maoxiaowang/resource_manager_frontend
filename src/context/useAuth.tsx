import React, {ReactNode} from 'react';
import API from "../config/api";
import useAxios, {defaultAxios} from "../services/useAxios";
import {AxiosResponse} from "axios";

interface AuthContextValue {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    userId: bigint | null;
    setUserId: React.Dispatch<React.SetStateAction<bigint | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const AuthProvider = ({children} : { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(true);
    const [username, setUsername] = React.useState<string>('');
    const [userId, setUserId] = React.useState<bigint | null>(null);
    const [token, setToken] = React.useState<string | null>(null);


    const {axiosInstance} = useAxios();

    // Get user server state
    React.useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const response: AxiosResponse = await defaultAxios.get(API.auth.whoami);
                const user = response.data;
                setIsAuthenticated(!!user.id);
                setUsername(user.username);
                setUserId(user.id);
            } catch (error) {
                setIsAuthenticated(false);
                setUsername('');
                setUserId(null);
            }
        };

        fetchAuthData().then(() => {});
    }, []);

    // Function to handle login and store tokens in cookies
    const login = async (username: string, password: string) => {
        try {
            const response: AxiosResponse = await axiosInstance.post(
                API.auth.obtainToken, {
                    username: username,
                    password: password,
                });
            setIsAuthenticated(true);
            const data = response.data;
            setUsername(data.user.username); // Set username if available
            setUserId(data.user.id); // Set userId if available
            setToken(data.access);
        } catch (error) {
            console.error('Login failed:', error);
            return await Promise.reject(error);
        }
    };

    // Function to handle logout and clear cookies
    const logout = async () => {
        await axiosInstance.delete(API.auth.destroyToken);
        console.debug('logout successfully');
        setIsAuthenticated(false);
        setUsername('');
        setUserId(null);
        setToken(null);
    };

    const value: AuthContextValue = {
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        userId,
        setUserId,
        token,
        setToken,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return React.useContext(AuthContext) as AuthContextValue;
};
