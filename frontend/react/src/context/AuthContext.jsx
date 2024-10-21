import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { login as performLogin } from "../../src/service/Authenticate.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setCustomer({
                    username: decodedToken.sub,
                    roles: decodedToken.permission.map(perm => perm.authority),
                    isAdmin: decodedToken.permission.some(perm => perm.authority === "ROLE_ADMIN")
                });
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("access_token");
            }
        }
    };

    useEffect(() => {
        setCustomerFromToken();
    }, []);

    const login = async (emailAndPassword) => {
        try {
            const res = await performLogin(emailAndPassword);
            const { token, refreshToken } = res.data.data;

            if (!token) {
                throw new Error("No token received from server");
            }

            localStorage.setItem("access_token", token);
            localStorage.setItem("refresh_token", refreshToken);

            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;
            const isAdmin = decodedToken.permission.some(perm => perm.authority === "ROLE_ADMIN");

            setCustomer({
                username: username,
                roles: decodedToken.permission.map(perm => perm.authority),
                isAdmin: isAdmin
            });

            return {
                ...res,
                decodedToken: {
                    username,
                    isAdmin,
                    permissions: decodedToken.permission.map(perm => perm.authority)
                }
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setCustomer(null);
    };

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        try {
            const { exp: expiration } = jwtDecode(token);
            if (Date.now() > expiration * 1000) {
                logOut();
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error checking authentication:", error);
            logOut();
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;