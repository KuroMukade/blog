import { ButtonHTMLAttributes, memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outlined',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSize {
  L = 'size_l',
  M = 'size_m',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButton;
   size?: ButtonSize;
   disabled?: boolean;
}

export const Button = memo(({
  className,
  theme = ThemeButton.CLEAR,
  children,
  disabled,
  size = ButtonSize.M,
  ...restBtnProps
}: ButtonProps) => {
  const mods: Record<string, boolean | undefined> = {
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
});

Button.displayName = 'Button';
