import { useEffect } from "react";

import useDebounce from "./useDebounce";

const useKeyHold = (
  key: KeyboardEvent["key"],
  onHoldStart: (e: KeyboardEvent) => void,
  onHoldEnd?: (e: KeyboardEvent) => void,
  enabled = true
) => {
  const handleKeyDown = useDebounce((e: KeyboardEvent) => {
    if (key === e.key) {
      onHoldStart(e);
    }
  }, 300);
  const handleKeyUp = useDebounce((e: KeyboardEvent) => {
    if (key === e.key) {
      onHoldEnd?.(e);
    }
  }, 300);

  useEffect(() => {
    if (enabled) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, enabled]);
};

export default useKeyHold;
