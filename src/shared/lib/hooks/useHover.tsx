import { useCallback, useMemo, useState } from 'react';

interface UserHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UserHoverBind]

export function useHover(): UseHoverResult {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(
    () => [
      isHover, {
        onMouseLeave,
        onMouseEnter,
      }],
    [onMouseEnter, onMouseLeave, isHover],
  );
}
