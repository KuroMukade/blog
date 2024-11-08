import { memo, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames';

import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
}

export const Sidebar = memo(({ className, collapsed }: SidebarProps) => {
  const sidebarItems = useSelector(getSidebarItems);

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
              <ThemeSwithcer collapsed={collapsed} />
              <LangSwitcher collapsed={collapsed} />
          </div>
      </div>
  );
});
