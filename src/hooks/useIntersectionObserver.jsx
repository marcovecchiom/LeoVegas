import { useState, useEffect } from 'react';

/**
 * This custom hook uses the Intersection Observer API to determine if an element
 * is intersecting with the viewport. It returns a boolean value indicating whether
 * the element is intersecting or not.
 *
 * @param {Object} ref - The reference to the element to observe.
 * @param {Object} options - The configuration options for the Intersection Observer.
 * @return {boolean} A boolean value indicating whether the element is intersecting or not.
 */
export const useIntersectionObserver = (ref, options) => {
  // Initialize the state variable for whether the element is intersecting
  const [intersecting, setIntersecting] = useState(false);

  // Use the effect hook to set up the Intersection Observer
  useEffect(() => {
    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver((entries) => {
      // Get the first entry from the entries array
      const entry = entries[0];
      // Update the state variable with the isIntersecting property of the entry
      setIntersecting(entry.isIntersecting);
    }, options);

    // If the ref is not null, observe the element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up the Intersection Observer by disconnecting it when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [ref, options]); // Re-run the effect when the ref or options change

  // Return the state variable indicating whether the element is intersecting
  return intersecting;
};
