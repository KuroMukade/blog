import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Theme, ThemeProvider } from 'shared/contexts/theme';

import 'shared/config/i18n';

import App from 'app/App';

import { ErrorBoundary } from 'app/providers/ErrorBoundary';

import 'app/styles/index.scss';
import { StoreProvider } from 'app/providers/StoreProvider';

render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider initialTheme={Theme.LIGHT}>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
