import { memo } from 'react';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';

import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
   item: SidebarItemType;
}

export const SidebarItem = memo(({
  item,
}: SidebarItemProps) => {
  return (
      <AppLink className={styles.link} theme={AppLinkTheme.PRIMARY} to={item.path}>
          <img src={item.icon} alt="" />
          <span data-sidebar-label>{item.text}</span>
      </AppLink>
  );
});

SidebarItem.displayName = 'SidebarItem';
