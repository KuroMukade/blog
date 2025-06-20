import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    elementId: string;
}

export const Portal: FC<PortalProps> = ({
  children,
  elementId,
}) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.querySelector(`#${elementId}`);
    if (el) {
      setContainer(el);
    }
  }, [elementId]);

  if (!container) return null;
  return createPortal(children, container);
};
