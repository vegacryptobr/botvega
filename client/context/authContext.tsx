import { createContext, ReactNode, useContext, useState } from 'react';

type AuthContextType = {
    token: string;
    successfulLogin: boolean;
    logMessage: string;
    error: string;
    setToken: (token: string) => void;
    setError: (error: string) => void;
    setLogMessage: (message: string) => void;
    setSuccessfulLogin: (isAuth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
  };
  
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [logMessage, setLogMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = localStorage.getItem('token') ?? ''
        if (token.length > 1) {
            localStorage.setItem('token', token);
        }
        if (token && token.length < 1) {
            setToken(localStorage.getItem('token') ?? '');
        }
    }
    return (
        <AuthContext.Provider value={{ successfulLogin, token, logMessage, error, setError, setToken, setLogMessage, setSuccessfulLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}