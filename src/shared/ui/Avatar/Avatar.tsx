import React, { CSSProperties, FC, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Avatar.module.scss';

interface AvatarProps {
   alt: string;
   className?: string;
   src: string;
   size?: string | number;
   rounded?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  className, src, size = '100%', alt, rounded = true,
}) => {
  const mods: Mods = {
    [styles.rounded]: rounded,
  };

  const imgStyles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
      <img
          style={imgStyles}
          className={classNames(styles.avatar, mods, [className])}
          src={src}
          alt={alt}
      />
  );
};
