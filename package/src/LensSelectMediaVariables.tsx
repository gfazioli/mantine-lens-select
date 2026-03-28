import React from 'react';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  useMantineTheme,
  type MantineBreakpoint,
  type StyleProp,
} from '@mantine/core';

function toCssValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
}

interface LensSelectMediaVariablesProps {
  itemSize?: StyleProp<number | string>;
  gap?: StyleProp<number | string>;
  pillHeight?: StyleProp<number | string>;
  pillWidth?: StyleProp<number>;
  selector: string;
}

export function LensSelectMediaVariables({
  itemSize,
  gap,
  pillHeight,
  pillWidth,
  selector,
}: LensSelectMediaVariablesProps) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--ls-item-size': toCssValue(getBaseValue(itemSize) as number | string),
    '--ls-gap': toCssValue(getBaseValue(gap) as number | string),
    '--ls-pill-height': toCssValue(getBaseValue(pillHeight) as number | string),
    '--ls-pill-width': toCssValue(getBaseValue(pillWidth) as number),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (
        typeof itemSize === 'object' &&
        itemSize !== null &&
        (itemSize as Record<string, unknown>)[breakpoint] !== undefined
      ) {
        const val = toCssValue(
          (itemSize as Record<string, unknown>)[breakpoint] as number | string
        );
        if (val) {
          acc[breakpoint]['--ls-item-size'] = val;
        }
      }

      if (
        typeof gap === 'object' &&
        gap !== null &&
        (gap as Record<string, unknown>)[breakpoint] !== undefined
      ) {
        const val = toCssValue((gap as Record<string, unknown>)[breakpoint] as number | string);
        if (val) {
          acc[breakpoint]['--ls-gap'] = val;
        }
      }

      if (
        typeof pillHeight === 'object' &&
        pillHeight !== null &&
        (pillHeight as Record<string, unknown>)[breakpoint] !== undefined
      ) {
        const val = toCssValue(
          (pillHeight as Record<string, unknown>)[breakpoint] as number | string
        );
        if (val) {
          acc[breakpoint]['--ls-pill-height'] = val;
        }
      }

      if (
        typeof pillWidth === 'object' &&
        pillWidth !== null &&
        (pillWidth as Record<string, unknown>)[breakpoint] !== undefined
      ) {
        const val = toCssValue((pillWidth as Record<string, unknown>)[breakpoint] as number);
        if (val) {
          acc[breakpoint]['--ls-pill-width'] = val;
        }
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}
