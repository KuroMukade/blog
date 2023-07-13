import React, { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string
}

export const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation('article');
  return (
      <div className={classNames(styles.wrapper, {}, [className])} />
  );
};
