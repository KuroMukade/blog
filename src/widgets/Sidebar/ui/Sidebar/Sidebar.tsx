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
  const sidebarItems = useSelector((store) => getSidebarItems(store, t));

  const linkList = useMemo(() => sidebarItems.map((item) => {
    const { path } = item;
    return <SidebarItem item={item} collapsed={collapsed} key={path} />;
  }), [collapsed, sidebarItems]);

  return (
      <div
          data-testid="sidebar"
          className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
          <nav className={styles.nav}>
              {linkList}
          </nav>
          <div
              className={
                    classNames(styles.switchers, { [styles.collapsedSwitchers]: collapsed }, [className])
                }
          >
              <ThemeSwitcher collapsed={collapsed} />
              <LangSwitcher collapsed={collapsed} />
          </div>
      </div>
  );
});

Sidebar.displayName = 'Sidebar';
