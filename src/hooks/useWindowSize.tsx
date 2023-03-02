import { ReactNode, useEffect, useState } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width, height };
}
export const OnDesktop = ({ children }: { children: ReactNode }) => {
  const { width } = useWindowSize();
  if (width && width > 768) return <>{children}</>;
  return null;
};
