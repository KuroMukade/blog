import React, {
  FC, InputHTMLAttributes, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (value: string) => void;
}

export const Input = memo(({
  className, onChange, value, type = 'text', placeholder = '',
}: InputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
      <input
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className={classNames(styles.input, {}, [className])}
      />
  );
});
