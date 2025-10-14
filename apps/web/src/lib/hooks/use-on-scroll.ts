import { useEffect } from "react";

type UseOnScrollParams = (bool?: boolean) => void;

export function useOnScroll(callback: UseOnScrollParams) {
  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScroll > lastScroll) {
            callback(false);
          } else {
            callback(true);
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
