import React from "react";
/**
 * This hook sets up an event listener to observe window resize events and executes a callback function when the window is resized.
 * @param ref - Ref object pointing to an HTML element
 * @param func - The callback function to execute
 */
const useResizeWindowObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  const observer = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new ResizeObserver(() => {
      if (ref.current) {
        callback();
      }
    });

    const observeTarget = ref.current;
    if (observeTarget) {
      observer.current.observe(observeTarget);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, callback]);
};

export { useResizeWindowObserver };
