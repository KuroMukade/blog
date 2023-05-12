import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';

import styles from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, theme = AppLinkTheme.PRIMARY, className, children, ...otherLinkProps } = props;

  return (
    <Link
      to={to}
      className={classNames(styles.wrapper, {}, [className, styles[theme]])}
      {...otherLinkProps}
    >
      {children}
    </Link>
  );
};
