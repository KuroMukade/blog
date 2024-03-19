import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Theme, ThemeProvider } from 'shared/contexts/theme';

import 'shared/config/i18n';

import App from 'app/App';

import { StoreProvider } from 'app/providers/StoreProvider';

import 'app/styles/index.scss';

render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider initialTheme={Theme.SIMPLE}>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
