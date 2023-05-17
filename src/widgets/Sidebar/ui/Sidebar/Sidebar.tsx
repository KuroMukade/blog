import React, { FC, useState } from 'react';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = async () => {
    setCollapsed((prev) => !prev);
  };

  return (
      <div
          data-testid="sidebar"
          className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
          <Button
              data-testid="sidebar-toggle"
              type="button"
              onClick={onToggle}
          >
              toggle

          </Button>
          <div className={styles.switchers}>
              <ThemeSwithcer />
              <LangSwitcher />
          </div>
      </div>
  );
};
