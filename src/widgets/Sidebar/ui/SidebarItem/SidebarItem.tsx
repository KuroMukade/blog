import { memo } from 'react';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';

import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
   item: SidebarItemType;
   collapsed: boolean;
}

export const SidebarItem = memo(({
  item, collapsed,
}: SidebarItemProps) => {
  return (
      <AppLink className={styles.link} theme={AppLinkTheme.PRIMARY} to={item.path}>
          <img src={item.icon} alt="" />
          {!collapsed && (
          <span className={styles.text}>
              {item.text}
          </span>
          )}
      </AppLink>
  );
});
