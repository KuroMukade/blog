import React, { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';

import styles from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to, theme = AppLinkTheme.PRIMARY, className, children,
  } = props;

  return (
      <Link
          to={to}
          className={classNames(styles.wrapper, {}, [className, styles[theme]])}
      >
          {children}
      </Link>
  );
});

AppLink.displayName = 'AppLink';
