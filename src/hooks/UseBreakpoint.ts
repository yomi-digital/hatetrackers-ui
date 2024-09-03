/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "react-responsive";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig.theme?.screens;

// type BreakpointKey = keyof typeof breakpoints;

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export function useBreakpoint(breakpointKey: ScreenSize) {
  const bool = useMediaQuery({
    query: `(min-width: ${(breakpoints as any)?.[breakpointKey]})`,
  });
  const capitalizedKey =
    (breakpointKey[0] as any).toUpperCase() +
    (breakpointKey as any).substring(1);
  type Key = `is${Capitalize<ScreenSize>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
