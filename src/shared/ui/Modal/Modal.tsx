import React, {
  FC, ReactNode, useCallback, useEffect, useState,
} from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTheme } from 'shared/contexts/theme';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
   className?: string;
   children: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
   tabIndex?: number;
}

export const Modal: FC<ModalProps> = ({
  className, children, onClose, isOpen = false, tabIndex, lazy = true,
}) => {
  const mods: Mods = {
    [styles.opened]: isOpen,
  };

  const [isMounted, setMounted] = useState(false);

  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
      <Portal>
          <div tabIndex={tabIndex} className={classNames(styles.modal, mods, [className, theme])}>
              <div className={styles.overlay} onClick={closeHandler}>
                  <div
                      onClick={onContentClick}
                      className={
                            classNames(styles.content, { [styles.modalOpen]: isOpen })
                        }
                  >
                      {children}
                  </div>
              </div>
          </div>
      </Portal>

  );
};
