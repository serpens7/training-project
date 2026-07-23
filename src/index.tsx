import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import './app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Root container not found. Unable to mount the React application.'
    );
}

const root = createRoot(container);

root.render(
    <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
);
