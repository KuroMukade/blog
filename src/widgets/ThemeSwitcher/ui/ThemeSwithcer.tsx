import { useTheme, Theme } from 'shared/contexts/theme';

import { classNames } from 'shared/lib/classNames';

import LightIcon from 'shared/assets/icons/light.svg';
import DarkIcon from 'shared/assets/icons/dark.svg';

import { useTranslation } from 'react-i18next';

import { TFunction } from 'i18next';

import styles from './ThemeSwithcer.module.scss';

interface ThemeSwithcerProps {
   className?: string;
   collapsed?: boolean;
}

const getThemeParams = (theme: Theme, t: TFunction) => {
  if (theme === Theme.DARK) {
    return {
      themeToShow: t('Темная тема'),
      style: styles.themeDark,
      icon: LightIcon,
    };
  }
  if (theme === Theme.LIGHT) {
    return {
      themeToShow: t('Светлая тема'),
      style: styles.themeLight,
      icon: DarkIcon,
    };
  }

  return {
    themeToShow: t('Простая тема'),
    style: styles.themeSimple,
    icon: DarkIcon,
  };
};

export const ThemeSwitcher = ({ className, collapsed }: ThemeSwithcerProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { themeToShow, style, icon } = getThemeParams(theme, t);

  return (
      <div
          role="button"
          className={
                classNames(
                  styles.wrapper,
                  {},
                  [className, theme === Theme.DARK ? styles.light : styles.dark],
                )
            }
          tabIndex={0}
          onKeyDown={toggleTheme}
          onClick={toggleTheme}
      >
          <img src={icon} alt={theme} />
          {!collapsed && (
          <span className={classNames(styles.themeName, {}, [style])}>
              {themeToShow}
          </span>
          )}
      </div>
  );
};
