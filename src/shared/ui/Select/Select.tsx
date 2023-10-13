import React, {
  ChangeEvent, FC, useCallback, useMemo,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
   className?: string;
   name?: string;
   value?: string;
   label?: string;
   options?: SelectOption[];
   onChange?: (value: string) => void;
   readonly?: boolean;
}

export const Select: FC<SelectProps> = ({
  className, label, options, onChange, name, readonly = false, value,
}) => {
  const mods: Mods = {};

  const onSelectValue = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const optionsList = useMemo(() => options?.map((option) => (
      <option
          key={option.value}
          className={styles.option}
          value={option.value}
          content={option.content}
      >
          {option.content}

      </option>
  )), [options]);
  return (
      <div className={classNames(styles.wrapper, mods, [className])}>
          {label && (
          <label htmlFor={name} className={styles.label}>
              {label}
          </label>
          )}
          {options && (
          <select value={value} disabled={readonly} onChange={onSelectValue} id={name}>
              {optionsList}
          </select>
          )}
      </div>
  );
};
