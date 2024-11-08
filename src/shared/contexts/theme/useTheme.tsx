import { useContext } from 'react';
import { COOKIES_STORAGE_THEME_KEY } from 'shared/constants/cookiestorage';

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

    cookieStore.set(COOKIES_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
}
