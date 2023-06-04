import React, { FC, useState } from 'react';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
      <div
          data-testid="sidebar"
          className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
          <nav className={styles.nav}>
              <AppLink theme={AppLinkTheme.PRIMARY} to="/">{t('Главная')}</AppLink>
              <AppLink theme={AppLinkTheme.PRIMARY} to="about">{t('О нас')}</AppLink>
          </nav>
          <Button
              data-testid="sidebar-toggle"
              type="button"
              className={styles.toggle}
              onClick={onToggle}
          // eslint-disable-next-line i18next/no-literal-string
          >
              →
          </Button>
          <div
              className={
                classNames(styles.switchers, { [styles.collapsedSwitchers]: collapsed }, [className])
            }
          >
              <ThemeSwithcer />
              <LangSwitcher />
          </div>
      </div>
  );
};
