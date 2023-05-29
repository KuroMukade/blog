import React, { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outlined',
}

export enum ButtonSize {
  L = 'size_l',
  M = 'size_m',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButton;
   size?: ButtonSize.M;
   disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  className, theme, children, disabled, size = ButtonSize.M, ...restBtnProps
}) => {
  const mods: Record<string, boolean> = {
    [styles[theme]]: true,
    [styles[size]]: true,
    [styles.disabled]: disabled,
  };

  return (
      <button
          type="button"
          className={
            classNames(
              styles.button,
              mods,
              [className],
            )
          }
          disabled={disabled}
          {...restBtnProps}
      >
          {children}
      </button>
  );
};
