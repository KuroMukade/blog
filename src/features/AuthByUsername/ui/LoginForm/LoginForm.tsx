import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { Text, TextTheme } from 'shared/ui/Text/Text';
import { type ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';

import styles from './LoginForm.module.scss';

interface LoginFormProps {
   className?: string
   onSuccess?: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useDynamicModuleLoader('loginForm', initialReducers, true);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Text theme={TextTheme.CLEAR} className={styles.title} title={t('Авторизация')} />
          {error && <Text theme={TextTheme.ERROR} text={error} />}
          <div className={styles.inputWrapper}>
              <Input
                  tabIndex={-1}
                  className={styles.username}
                  value={username}
                  placeholder={t('Имя')}
                  onChange={onChangeUsername}
                  type="text"
              />
              <Input
                  tabIndex={-2}
                  className={styles.password}
                  value={password}
                  placeholder={t('Пароль')}
                  onChange={onChangePassword}
                  type="password"
              />
          </div>
          <Button
              className={styles.btn}
              disabled={isLoading}
              onClick={onLoginClick}
              theme={ThemeButton.OUTLINE}
          >
              {t('Войти')}
          </Button>
      </div>
  );
});

export default LoginForm;
