import { useContext } from 'react';

import { cookieStore } from 'shared/lib/store';
import { THEME_COOKIE_STORAGE_KEY } from './constants';

import { Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;

    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.SIMPLE;
        break;
      case Theme.SIMPLE:
        newTheme = Theme.DARK;
        break;
      default: newTheme = Theme.DARK;
    }

    setTheme?.(newTheme);

    cookieStore.set(THEME_COOKIE_STORAGE_KEY, newTheme);
  };

  return { theme, toggleTheme };
}
