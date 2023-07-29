import { memo } from 'react';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/items';

import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
   item: SidebarItemType;
   collapsed: boolean;
}

export const SidebarItem = memo(({
  item, collapsed,
}: SidebarItemProps) => (
    <AppLink className={styles.link} theme={AppLinkTheme.PRIMARY} to={item.path}>
        <img className={styles.icon} src={item.icon} alt="" />
        {!collapsed && (
            <span className={styles.text}>
                {item.text}
            </span>
        )}
    </AppLink>
));
