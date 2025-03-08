import { useEffect } from 'react';

export const useLockBodyScrollModified = (isOpen: boolean) => {
  useEffect(() => {
    let originalStyle: string | undefined = undefined;
    if (isOpen) {
      originalStyle =
        window.getComputedStyle(document.body).overflow === 'hidden'
          ? originalStyle
          : window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    }

    if (!isOpen && originalStyle) {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      if (originalStyle) document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};
