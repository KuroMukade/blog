import {
  MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';

import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getSaveScrollScrollByPath, saveScrollActions } from 'features/SaveScroll';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import s from './Page.module.scss';

interface PageProps {
  className?: string;
  onScrollEnd?: () => void;
  isSaveScroll?: boolean;
  children: ReactNode;
}

export const Page = (props: PageProps) => {
  const {
    className, onScrollEnd, isSaveScroll = true, children,
  } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getSaveScrollScrollByPath(state, pathname));

  const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
    if (!isSaveScroll) return;
    dispatch(saveScrollActions.setScrollPosition({
      path: pathname,
      position: event.currentTarget.scrollTop,
    }));
  }, 499);

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
      <main onScroll={onScroll} ref={wrapperRef} className={classNames(s.pageWrapper, {}, [className])}>
          {children}
          {onScrollEnd && <div className={s.trigger} ref={triggerRef} />}
      </main>
  );
};
