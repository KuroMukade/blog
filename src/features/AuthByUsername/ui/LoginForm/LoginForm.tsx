import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

import styles from './LoginForm.module.scss';

interface LoginFormProps {
   className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, isLoading, error,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Text title={t('Авторизация')} />
          {error && <Text theme={TextTheme.ERROR} text={error} />}
          <Input value={username} placeholder={t('Имя')} onChange={onChangeUsername} type="text" />
          <Input value={password} placeholder={t('Пароль')} onChange={onChangePassword} type="text" />
          <Button
              disabled={isLoading}
              onClick={onLoginClick}
              theme={ThemeButton.OUTLINE}
          >
              {t('Войти')}
          </Button>
      </div>
  );
});
