import { memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

export const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            {t('Статья не найдена')}
        </div>
    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <ArticleDetails id={id} />
      </div>
  );
});
