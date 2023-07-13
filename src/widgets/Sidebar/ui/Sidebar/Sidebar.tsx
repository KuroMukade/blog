import React, { FC, useMemo, useState } from 'react';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

import { useTranslation } from 'react-i18next';

import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import styles from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const auth = useSelector(getUserAuthData);

  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const linkList = useMemo(() => SidebarItemsList.map((item) => {
    if (item.authOnly && !auth) {
      return null;
    }
    return <SidebarItem item={item} collapsed={collapsed} key={item.path} />;
  }), [collapsed, auth]);

  return (
      <div
          data-testid="sidebar"
          className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
          <nav className={styles.nav}>
              {linkList}
          </nav>
          <Button
              data-testid="sidebar-toggle"
              type="button"
              className={styles.toggle}
              onClick={onToggle}
          // eslint-disable-next-line i18next/no-literal-string
          >
              {collapsed ? '>' : '<-'}
          </Button>
          <div
              className={
                classNames(styles.switchers, { [styles.collapsedSwitchers]: collapsed }, [className])
            }
          >
              <ThemeSwithcer collapsed={collapsed} />
              <LangSwitcher collapsed={collapsed} />
          </div>
      </div>
  );
};
