"use client";

import { useState, useEffect } from "react";

/**
 * A utility hook that accepts a CSS media query string and returns
 * a boolean indicating whether the query currently matches.
 *
 * Defaults to `false` during SSR to avoid hydration mismatches.
 * After mount, uses `window.matchMedia` to get the actual value
 * and listens for changes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
