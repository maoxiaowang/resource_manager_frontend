import React, {ReactElement, useEffect} from 'react';
import {AuthProvider, useAuth} from "./context/useAuth";
import ROUTES from "./config/route";
import {Route, Routes, useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material";
import NotFound from "./pages/shared/NotFound";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import {BackdropProvider} from "./context/useBackdrop";
import {SnackbarProvider} from "./context/useSnackbar";

interface ProtectedRouteProps {
    element: ReactElement;
}

const App = () => {
    const theme = createTheme({
        spacing: 8,  // default
    });

    const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element}) => {
        const {isAuthenticated} = useAuth();

        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated) {
                // Redirect to login page
                navigate(ROUTES.auth.loginPage, {replace: true});
            }
        }, [isAuthenticated, navigate]);

        // Render the protected route or redirect to login page based on isAuthenticated
        return isAuthenticated ? element : null; // Return null if not authenticated
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BackdropProvider>
                <SnackbarProvider>
                    <AuthProvider>
                        <Routes>
                            <Route path={ROUTES.homePage} element={<ProtectedRoute element={<Home/>}/>}/>
                            <Route path={ROUTES.auth.loginPage} element={<Login/>}/>
                            <Route path="*" element={<NotFound/>}></Route>
                        </Routes>
                    </AuthProvider>
                </SnackbarProvider>
            </BackdropProvider>

        </ThemeProvider>
    );
};

export default App;
