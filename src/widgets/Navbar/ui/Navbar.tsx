import burgerIcon from 'shared/assets/icons/burger.svg';

import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginModal } from 'features/AuthByUsername';

import { useLogout } from 'entities/User';

import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { Link } from 'react-router-dom';
import { Image } from 'shared/ui/Image/Image';
import { useAuthModal } from '../model/useAuthModal';

import styles from './Navbar.module.scss';

interface NavbarProps {
  onBurgerClick?: () => void;
  isAuthAvailable?: boolean;
  isSidebarExpanded: boolean;
}

export const Navbar = ({ onBurgerClick, isAuthAvailable, isSidebarExpanded }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const { isAuthOpen, toggleModal } = useAuthModal();
  const logout = useLogout();
  if (isAuthAvailable) {
    return (
        <div className={styles.navbar}>
            <Button onClick={onBurgerClick} aria-controls="app-sidebar" aria-expanded={isSidebarExpanded}>
                <img src={burgerIcon} alt="toggle sidebar" />
            </Button>
            <Link to="/">
                <Image src="logo.svg" alt="website logo" />
            </Link>
            <Button theme={ThemeButton.OUTLINE} onClick={logout}>{t('Выйти')}</Button>
        </div>
    );
  }

  return (
      <div className={styles.navbar}>
          <Button onClick={onBurgerClick} aria-controls="app-sidebar" aria-expanded={isSidebarExpanded}>
              <img src={burgerIcon} alt="toggle sidebar" />
          </Button>
          <Link to="/">
              <Image src="logo.svg" alt="website logo" />
          </Link>
          <Button
              theme={ThemeButton.OUTLINE}
              onClick={toggleModal}
          >
              {t('Вход')}
          </Button>
          <LoginModal isOpen={isAuthOpen} onClose={toggleModal} />
      </div>
  );
};
