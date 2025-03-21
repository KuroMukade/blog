import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import 'shared/lib/i18n';
import 'app/styles/index.scss';

import App from 'app/App';

import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'shared/contexts/theme';
import { moveStyles } from 'used-styles/moveStyles';
import { CookiesProvider } from 'shared/contexts/cookies';
import { I18nextWrapper } from 'app/providers/i18';
import { loadableReady } from '@loadable/component';

moveStyles();
loadableReady(() => {
  hydrateRoot(
  document.getElementById('root')!,
      <BrowserRouter>
          <StoreProvider initialState={window.__PRELOADED_STATE__}>
              <CookiesProvider>
                  <I18nextWrapper>
                      <ThemeProvider>
                          <App />
                      </ThemeProvider>
                  </I18nextWrapper>
              </CookiesProvider>
          </StoreProvider>
      </BrowserRouter>,
  );
});
