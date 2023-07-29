import { FC, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import styles from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ className, collapsed }) => {
  const auth = useSelector(getUserAuthData);

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
