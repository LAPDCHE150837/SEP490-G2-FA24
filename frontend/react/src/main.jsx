import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProgressProvider from "./component/Record/ProgressContext.jsx";
import {ToastProvider} from "./context/ToastProvider.jsx";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastProvider>


                    <Router>
                        <App />
                    </Router>
                </ToastProvider>

            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)