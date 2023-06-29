import React, {
  memo, useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import styles from './CountrySelect.module.scss';
import { Country } from '../../model/types/country';

  interface CountrySelectProps {
     className?: string;
     value?: Country;
     onChange?: (value: Country) => void;
     readonly?: boolean;
  }

const options: SelectOption[] = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.USA, content: Country.USA },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(({
  className, onChange, value, readonly = false,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Select
              value={value}
              label={t('Укажите страну')}
              readonly={readonly}
              onChange={onChangeHandler}
              options={options}
          />
      </div>
  );
});
