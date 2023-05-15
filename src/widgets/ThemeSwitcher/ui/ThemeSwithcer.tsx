import React, { FC } from 'react';
import { useTheme, Theme } from 'shared/contexts/theme';

import { classNames } from 'shared/lib/classNames';

import LightIcon from 'shared/assets/icons/light.svg';
import DarkIcon from 'shared/assets/icons/dark.svg';

import styles from './ThemeSwithcer.module.scss';

interface ThemeSwithcerProps {
   className?: string
}

export const ThemeSwithcer: FC<ThemeSwithcerProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

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
          onKeyPress={toggleTheme}
          onClick={toggleTheme}
      >
          <img className={styles.img} src={theme === Theme.DARK ? DarkIcon : LightIcon} alt={theme} />
      </div>
  );
};
