import { EffectCallback, useEffect } from 'react';

export function useInitialEffect(callback: EffectCallback) {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
