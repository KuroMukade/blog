import React, { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';

import styles from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = ({ className, block }) => {
  const { paragraphs, title } = block;

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          {block.title && (
          <Text textSize="X" title={title} className={styles.title} />
          )}
          {paragraphs.map((paragraph) => (
              <Text className={styles.paragraph} key={paragraph} text={paragraph} />
          ))}
      </div>
  );
};
