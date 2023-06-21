import { useTheme, Theme } from 'shared/contexts/theme';

import { classNames } from 'shared/lib/classNames';

import LightIcon from 'shared/assets/icons/light.svg';
import DarkIcon from 'shared/assets/icons/dark.svg';

import { useTranslation } from 'react-i18next';
import styles from './ThemeSwithcer.module.scss';

interface ThemeSwithcerProps {
   className?: string;
   collapsed?: boolean;
}

export const ThemeSwithcer = ({ className, collapsed }: ThemeSwithcerProps) => {
  const { theme, toggleTheme } = useTheme();

  const { t } = useTranslation();

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
          <img className={styles.img} src={theme === Theme.DARK ? DarkIcon : LightIcon} alt={theme} />
          <span className={
            classNames(
              styles.themeName,
              {},
              [theme === Theme.LIGHT ? styles.themeLight : styles.themeDark],
            )
          }
          >
              {!collapsed && (theme === Theme.LIGHT ? t('Светлая тема') : t('Темная тема'))}
          </span>
      </div>
  );
};
