import debounce from "debounce";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = <T>(callback: (payload: T) => void, wait = 1000) => {
  const ref = useRef<(payload: T) => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (payload: T) => {
      ref.current?.(payload);
    };

    return debounce(func, wait);
  }, [wait]);

  return debouncedCallback;
};

export default useDebounce;
