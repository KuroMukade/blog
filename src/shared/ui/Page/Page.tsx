import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames';

import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import s from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const { className, onScrollEnd, children } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
      <main ref={wrapperRef} className={classNames(s.pageWrapper, {}, [className])}>
          {children}
          <div ref={triggerRef} />
      </main>
  );
};
