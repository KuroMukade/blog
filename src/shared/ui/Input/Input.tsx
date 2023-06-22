import React, {
  FC, InputHTMLAttributes, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (value: string) => void;
   readOnly?: boolean;
}

export const Input = memo(({
  className, onChange, value, type = 'text', placeholder = '', readOnly = false,
}: InputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Record<string, boolean> = {
    [styles.readonly]: readOnly,
  };

  return (
      <input
          value={value}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChangeHandler}
          className={classNames(styles.input, mods, [className])}
      />
  );
});
