import React, {
  FC, HTMLAttributes, InputHTMLAttributes, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames';

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
      <input onChange={onChangeHandler} className={classNames('', {}, [className])} />
  );
};
