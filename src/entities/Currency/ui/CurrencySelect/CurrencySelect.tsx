import React, {
  FC, memo, useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import styles from './CurrencySelect.module.scss';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
   className?: string;
   value?: Currency;
   onChange?: (value: Currency) => void;
   readonly?: boolean;
}

const options: SelectOption[] = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(({
  className, onChange, value, readonly = false,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Select
              value={value}
              label={t('Укажите валюту')}
              readonly={readonly}
              onChange={onChangeHandler}
              options={options}
          />
      </div>
  );
});

CurrencySelect.displayName = 'CurrencySelect';
