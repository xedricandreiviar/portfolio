import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners: Map<string, ((event: MediaQueryListEvent) => void)[]>;
  let matchesMap: Map<string, boolean>;

  beforeEach(() => {
    listeners = new Map();
    matchesMap = new Map();

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => {
        if (!listeners.has(query)) {
          listeners.set(query, []);
        }
        return {
          matches: matchesMap.get(query) ?? false,
          media: query,
          addEventListener: (
            _event: string,
            handler: (event: MediaQueryListEvent) => void
          ) => {
            listeners.get(query)!.push(handler);
          },
          removeEventListener: (
            _event: string,
            handler: (event: MediaQueryListEvent) => void
          ) => {
            const list = listeners.get(query)!;
            const idx = list.indexOf(handler);
            if (idx >= 0) list.splice(idx, 1);
          },
        };
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should default to false during SSR (before effect runs)", () => {
    matchesMap.set("(hover: none)", true);
    // On initial render before useEffect fires, state is false
    const { result } = renderHook(() => useMediaQuery("(hover: none)"));
    // After effect runs, it should reflect the actual value
    expect(result.current).toBe(true);
  });

  it("should return true when the media query matches", () => {
    matchesMap.set("(hover: none)", true);
    const { result } = renderHook(() => useMediaQuery("(hover: none)"));
    expect(result.current).toBe(true);
  });

  it("should return false when the media query does not match", () => {
    matchesMap.set("(hover: none)", false);
    const { result } = renderHook(() => useMediaQuery("(hover: none)"));
    expect(result.current).toBe(false);
  });

  it("should update when the media query match state changes", () => {
    matchesMap.set("(hover: none)", false);
    const { result } = renderHook(() => useMediaQuery("(hover: none)"));
    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      const handlers = listeners.get("(hover: none)")!;
      for (const handler of handlers) {
        handler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it("should clean up listener on unmount", () => {
    matchesMap.set("(hover: none)", false);
    const { unmount } = renderHook(() => useMediaQuery("(hover: none)"));

    expect(listeners.get("(hover: none)")!.length).toBe(1);
    unmount();
    expect(listeners.get("(hover: none)")!.length).toBe(0);
  });

  it("should re-subscribe when query changes", () => {
    matchesMap.set("(hover: none)", true);
    matchesMap.set("(prefers-reduced-motion: reduce)", false);

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: "(hover: none)" } }
    );

    expect(result.current).toBe(true);

    rerender({ query: "(prefers-reduced-motion: reduce)" });
    expect(result.current).toBe(false);
  });
});
