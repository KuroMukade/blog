import React, { InputHTMLAttributes, memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
   className?: string;
   onChange?: (value: string) => void;
   readonly?: boolean;
}

export const Input = memo(({
  className, onChange, value, type = 'text', placeholder = '', readonly = false, ...restInputProps
}: InputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [styles.readonly]: readonly,
  };

  return (
      <input
          {...restInputProps}
          value={value}
          type={type}
          placeholder={placeholder}
          readOnly={readonly}
          onChange={onChangeHandler}
          className={classNames(styles.input, mods, [className])}
      />
  );
});
Input.displayName = 'Input';
