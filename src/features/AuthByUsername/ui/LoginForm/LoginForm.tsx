import React, { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import styles from './LoginForm.module.scss';

interface LoginFormProps {
   className?: string
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <h4>{t('Авторизация')}</h4>
          <Input type="text" />
          <Input type="text" />
          <Button theme={ThemeButton.OUTLINE}>{t('Войти')}</Button>
      </div>
  );
};
