import React, {
  createContext, FC, ReactNode, useMemo, useState,
} from 'react';
import { useCookies } from '../cookies';
import { THEME_COOKIE_STORAGE_KEY } from './constants';

export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
  SIMPLE = 'app_simple_theme'
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const DEFAULT_APP_THEME = Theme.LIGHT;

export const ThemeContext = createContext<ThemeContextProps>({
  setTheme: () => {},
  theme: Theme.DARK,
});

const getInitialTheme = (initTheme: string) => {
  if (initTheme !== Theme.LIGHT && initTheme !== Theme.DARK && initTheme !== Theme.SIMPLE) {
    return DEFAULT_APP_THEME;
  }

  return initTheme;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [initTheme] = useCookies(THEME_COOKIE_STORAGE_KEY);
  console.log({ initTheme });

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
