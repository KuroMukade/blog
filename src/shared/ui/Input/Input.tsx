import React, {
  FC, HTMLAttributes, InputHTMLAttributes, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({
  className, onChange, value, type = 'text', ...restInputProps
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
      <input className={classNames(styles.wrapper, {}, [className])} />
  );
};
