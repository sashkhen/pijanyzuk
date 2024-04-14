import { useEffect, useState } from "react";

const useReady = () => {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return isReady;
};

export default useReady;
