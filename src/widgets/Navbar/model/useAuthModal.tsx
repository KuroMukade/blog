import { useCallback, useState } from 'react';

export const useAuthModal = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setAuthOpen((prev) => !prev);
  }, []);

  return {
    isAuthOpen,
    toggleModal,
  };
};
