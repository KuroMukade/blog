import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   children: ReactNode;
}

export const Card = (props: CardProps) => {
  const { className, children, ...restCardProps } = props;
  return (
      <div className={classNames(styles.card, {}, [className])} {...restCardProps}>
          {children}
      </div>
  );
};
