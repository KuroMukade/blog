import {
  ChangeEvent, ReactNode, TextareaHTMLAttributes, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './TextArea.module.scss';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  button: ReactNode;
  onChange: (value: string) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
  const {
    className, value, button, onChange, ...restTextAreaProps
  } = props;

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
      <>
          <textarea
              className={classNames(styles.wrapper, {}, [className])}
              onChange={onTextAreaChange}
              value={value}
          />
          {button}
      </>
  );
});

TextArea.displayName = 'TextArea';
