import { useCallback } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Code.module.scss';
import { Button } from '../Button/Button';

interface CodeProps {
   className?: string;
   text: string;
}

export const Code = (props: CodeProps) => {
  const { className, text } = props;
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);
  return (
      <pre className={styles.wrapper}>
          <Button onClick={onCopy} className={styles.copy}>Copy</Button>
          <code className={classNames(styles.code, {}, [className])}>
              {text}
          </code>
      </pre>
  );
};
