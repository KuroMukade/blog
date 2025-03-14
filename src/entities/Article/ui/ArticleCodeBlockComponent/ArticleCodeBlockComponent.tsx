import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Code } from 'shared/ui/Code/Code';
import styles from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
   className?: string;
   block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => {
  const { code } = block;
  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Code text={code} />
      </div>
  );
});

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
