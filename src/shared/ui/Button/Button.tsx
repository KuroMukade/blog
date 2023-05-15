import React, { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = ({
    className, theme, children, ...restBtnProps
}) => (
    <button type="button" className={classNames(styles.button, {}, [styles[theme], className])} {...restBtnProps}>
        {children}
    </button>
);
