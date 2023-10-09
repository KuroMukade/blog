import { classNames } from 'shared/lib/classNames';
import { useTranslation } from 'react-i18next';
import s from './ArticleListSkeleton.module.scss';

interface ArticleListSkeletonProps {
  className?: string;
}

export const ArticleListSkeleton = (props: ArticleListSkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
      <div className={classNames(s.wrapper, {}, [className])}>
          ArticleListSkeletonComponent
      </div>
  );
};
