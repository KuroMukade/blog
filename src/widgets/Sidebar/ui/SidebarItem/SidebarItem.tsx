import { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
      <AppLink className={styles.link} theme={AppLinkTheme.PRIMARY} to={item.path}>
          <img src={item.icon} alt="" />
          {!collapsed && (
          <span className={styles.text}>
              {t(item.text)}
          </span>
          )}
      </AppLink>
  );
});
