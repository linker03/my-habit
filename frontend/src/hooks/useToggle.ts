import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => {
    setIsOpen((state) => !state);
  };

  return { isOpen, open, close, toggle };
};
