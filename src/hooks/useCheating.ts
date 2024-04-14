import { useCallback, useEffect, useMemo, useState } from "react";

const useCheating = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const isEnabled = useMemo(
    () => /letmecheat/gi.test(letters.join("")),
    [letters]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setLetters((prev) => [...prev, e.key]);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isEnabled) {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown, isEnabled]);

  return isEnabled;
};

export default useCheating;
