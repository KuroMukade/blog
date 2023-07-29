import React, { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Text.module.scss';

export type TextSize = 'XL' | 'X' | 'L' | 'S' | 'M';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    CLEAR = 'clear',
}

interface TextProps {
   className?: string;
   title?: string;
   text?: string;
   theme?: TextTheme;
   textSize?: TextSize;
}

export const Text: FC<TextProps> = ({
  className, title, text, theme = TextTheme.PRIMARY, textSize = 'LOW',
}) => {
  const mods: Mods = {
    [styles[theme]]: true,
    [styles[textSize]]: true,
  };
  return (
      <div className={classNames(styles.wrapper, mods, [className])}>
          {title && <p className={styles.title}>{title}</p>}
          {text && <p className={styles.text}>{text}</p>}
      </div>
  );
};
