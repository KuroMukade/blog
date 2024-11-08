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
      themeToShow: t('Светлая тема'),
      style: styles.themeDark,
      icon: DarkIcon,
    };
  }
  if (theme === Theme.LIGHT) {
    return {
      themeToShow: t('Легкая тема'),
      style: styles.themeLight,
      icon: LightIcon,
    };
  }

  return {
    themeToShow: t('Простая тема'),
    style: styles.themeSimple,
    icon: DarkIcon,
  };
};

export const ThemeSwithcer = ({ className, collapsed }: ThemeSwithcerProps) => {
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
          <img className={styles.img} src={icon} alt={theme} />
          <span className={classNames(styles.themeName, {}, [style])}>
              {!collapsed && themeToShow}
          </span>
      </div>
  );
};
