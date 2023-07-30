import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Text } from 'shared/ui/Text/Text';
import styles from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => {
  const { src, title } = block;
  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Text title={title} />
          <img src={src} alt="" />
      </div>
  );
});
