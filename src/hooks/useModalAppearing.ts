import { useEffect, useState } from "react";

interface useModalAppearingProps {
  isOpen: boolean;
  timeout?: number;
}

export const useModalAppearing = ({
  isOpen,
  timeout = 300,
}: useModalAppearingProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const mounting = (isOpen && !isMounted) || (isOpen && isMounted);
  const hiding = !isOpen && isMounted;

  const isVisible = isMounted || isOpen;

  useEffect(() => {
    let timerId: number | null = null;
    if (mounting) {
      timerId = window.setTimeout(() => {
        setIsMounted(true);
      }, timeout);
    }

    if (hiding) {
      timerId = window.setTimeout(() => {
        setIsMounted(false);
      }, timeout);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [mounting, hiding, isOpen, timeout]);

  return { isVisible, mounting, hiding };
};
