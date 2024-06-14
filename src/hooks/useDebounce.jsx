import { useEffect, useState } from 'react';
/**
 * Custom hook that debounces a value.
 *
 * @param {any} value - The value to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds before the value is updated.
 * @returns {any} The debounced value.
 */
export function useDebounce(value, delay = 500) {
  // State to hold the debounced value.
  const [debouncedValue, setDebouncedValue] = useState(value);

  // useEffect hook to update the debounced value after the delay.
  useEffect(() => {
    // Set up a timer to update the debounced value after the delay.
    const timer = setTimeout(() => {
      // Update the debounced value with the new value.
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timer if the component unmounts or if the value or delay changes.
    return () => clearTimeout(timer);
  }, [value, delay]); // Re-run the effect if the value or delay changes.

  // Return the debounced value.
  return debouncedValue;
}
