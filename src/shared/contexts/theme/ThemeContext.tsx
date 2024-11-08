import React, {
  createContext, FC, ReactNode, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants/localstorage';
import { localStore } from 'shared/lib/store';
import { useCookies } from '../cookies';

export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
  SIMPLE = 'app_simple_theme'
}

interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const DEFAULT_APP_THEME = Theme.LIGHT;

export const ThemeContext = createContext<ThemeContextProps>({
  setTheme: () => {},
  theme: null,
});

// const defaultTheme = (localStore.get(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.SIMPLE;

const getInitialTheme = (initTheme: string) => {
  if (initTheme !== Theme.LIGHT && initTheme !== Theme.DARK && initTheme !== Theme.SIMPLE) {
    return DEFAULT_APP_THEME;
  }

  return initTheme;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [initTheme] = useCookies('theme');

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(initTheme));

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
