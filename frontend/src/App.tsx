import { useState, useEffect } from 'react';
import PublicApp from './PublicApp';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

type Page = 'public' | 'admin-login' | 'admin-panel';

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('public');
    const [apiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        // Check if we're on admin route
        const path = window.location.pathname;
        if (path === '/admin' || path === '/admin/') {
            // Check if user has API key stored
            const storedKey = localStorage.getItem('admin_api_key');
            if (storedKey) {
                setApiKey(storedKey);
                setCurrentPage('admin-panel');
            } else {
                setCurrentPage('admin-login');
            }
        }

        // Listen for navigation
        window.addEventListener('popstate', handleNavigation);
        return () => window.removeEventListener('popstate', handleNavigation);
    }, []);

    const handleNavigation = () => {
        const path = window.location.pathname;
        if (path === '/admin' || path === '/admin/') {
            const storedKey = localStorage.getItem('admin_api_key');
            if (storedKey) {
                setApiKey(storedKey);
                setCurrentPage('admin-panel');
            } else {
                setCurrentPage('admin-login');
            }
        } else {
            setCurrentPage('public');
        }
    };

    const handleLogin = (key: string) => {
        setApiKey(key);
        setCurrentPage('admin-panel');
        window.history.pushState({}, '', '/admin');
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_api_key');
        setApiKey('');
        setCurrentPage('admin-login');
    };

    const goToAdmin = () => {
        window.history.pushState({}, '', '/admin');
        handleNavigation();
    };

    const goToPublic = () => {
        window.history.pushState({}, '', '/');
        setCurrentPage('public');
    };

    if (currentPage === 'admin-login') {
        return <AdminLogin onLogin={handleLogin} />;
    }

    if (currentPage === 'admin-panel') {
        return <AdminPanel apiKey={apiKey} onLogout={handleLogout} />;
    }

    return <PublicApp onAdminClick={goToAdmin} />;
}
