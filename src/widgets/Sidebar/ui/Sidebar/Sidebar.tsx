import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames';

import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
}

export const Sidebar = memo(({ className, collapsed }: SidebarProps) => {
  const { t } = useTranslation();
  const sidebarItems = useSelector(getSidebarItems);

  const linkList = useMemo(() => sidebarItems.map((item) => {
    return <SidebarItem item={{ ...item, text: t(item.text) }} key={item.path} />;
  }), [sidebarItems, t]);

  return (
      <div
          id="app-sidebar"
          data-testid="sidebar"
          className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
          <div className={styles.panel}>
              <nav className={styles.nav}>
                  {linkList}
              </nav>
              <div className={styles.switchers}>
                  <ThemeSwitcher />
                  <LangSwitcher />
              </div>
          </div>
      </div>
  );
});

Sidebar.displayName = 'Sidebar';
