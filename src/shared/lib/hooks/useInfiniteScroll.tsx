import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollProps {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback, triggerRef, wrapperRef,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const triggerEl = triggerRef.current;
    let observer: IntersectionObserver | null = null;
    if (callback && wrapperRef) {
      const options = {
        root: wrapperEl,
        rootMargin: '0px',
        thereshold: 1.0,
      };
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) callback();
      }, options);

      observer.observe(triggerEl);

      return () => {
        if (observer) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(triggerEl);
        }
      };
    }
    return undefined;
  }, [callback, wrapperRef, triggerRef]);
}
