import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Theme, ThemeProvider } from 'shared/contexts/theme';

import 'shared/lib/i18n';

import App from 'app/App';

import { StoreProvider } from 'app/providers/StoreProvider';

import 'app/styles/index.scss';

hydrateRoot(
  document.getElementById('root')!,
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider initialTheme={Theme.SIMPLE}>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);
