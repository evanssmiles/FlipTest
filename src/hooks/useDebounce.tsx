import {useRef} from 'react';

// useDebounce hook takes in two parameters: the callback function and the delay time (in milliseconds)
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T, // The function to debounce
  delay: number, // The delay in milliseconds before executing the callback
): (...args: Parameters<T>) => void {
  // The hook returns a debounced version of the callback
  // useRef hook is used to keep a mutable reference to the timeout ID between renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The returned function, which is debounced, accepts the same arguments as the original callback
  return (...args: Parameters<T>) => {
    // If there is an active timeout, clear it to reset the timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to invoke the callback after the specified delay
    timeoutRef.current = setTimeout(() => {
      // Call the original callback with the provided arguments after the delay
      callback(...args);
    }, delay); // The callback will be invoked after the 'delay' time has passed
  };
}
