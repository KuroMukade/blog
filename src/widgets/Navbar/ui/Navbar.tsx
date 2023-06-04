import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LoginModal } from 'features/AuthByUsername';

import { getUserAuthData, userActions } from 'entities/User';

import { Button, GrowthColor, ThemeButton } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames';

import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthOpen, setAuthOpen] = useState(false);

  const dispatch = useDispatch();

  const authData = useSelector(getUserAuthData);

  const onToggleModal = useCallback(() => {
    setAuthOpen((prev) => !prev);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
        <div className={classNames(styles.navbar, {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onLogout}>{t('Выйти')}</Button>
        </div>
    );
  }

  return (
      <div className={classNames(styles.navbar, {}, [className])}>
          <Button
              theme={ThemeButton.OUTLINE}
              onClick={onToggleModal}
          >
              {t('Вход')}
          </Button>
          <LoginModal isOpen={isAuthOpen} onClose={onToggleModal} />
      </div>
  );
};
