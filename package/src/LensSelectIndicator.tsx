import React, { useMemo } from 'react';
import {
  Box,
  BoxProps,
  factory,
  Factory,
  getThemeColor,
  StylesApiProps,
  useMantineTheme,
  useProps,
  type MantineColor,
} from '@mantine/core';
import { useLensSelectContext } from './LensSelect.context';

export type LensSelectIndicatorVariant = 'default' | 'outline';

export interface LensSelectIndicatorProps
  extends BoxProps, StylesApiProps<LensSelectIndicatorFactory> {
  /** Indicator variant, `'default'` renders a filled dot, `'outline'` renders a circle border */
  variant?: LensSelectIndicatorVariant;

  /** Color of the indicator, uses theme primary by default */
  color?: MantineColor;

  /** Diameter of the indicator dot in px, `6` by default */
  size?: number;

  /** Distance between the indicator and the pills in px, `16` by default */
  offset?: number;

  /** Custom indicator content. If not provided, a default dot is rendered. */
  children?: React.ReactNode;
}

export type LensSelectIndicatorFactory = Factory<{
  props: LensSelectIndicatorProps;
  ref: HTMLDivElement;
  stylesNames: 'indicator';
  variant: LensSelectIndicatorVariant;
}>;

const defaultProps: Partial<LensSelectIndicatorProps> = {
  variant: 'default',
  size: 6,
  offset: 16,
};

export const LensSelectIndicator = factory<LensSelectIndicatorFactory>((_props, ref) => {
  const props = useProps('LensSelectIndicator', defaultProps, _props);
  const { children, variant, color, size, offset, ...others } = props;

  const theme = useMantineTheme();
  const ctx = useLensSelectContext();

  const activeIndex = useMemo(
    () => ctx.items.findIndex((item) => item.value === ctx.activeValue),
    [ctx.items, ctx.activeValue]
  );

  if (activeIndex < 0) {
    return null;
  }

  const isVertical = ctx.orientation === 'vertical';

  // In pill mode, each item is pillWidth wide; otherwise itemSize
  const slotSize = ctx.isPillMode ? 'var(--ls-pill-width, 4px)' : 'var(--ls-item-size, 24px)';

  const translateOffset = `calc(${activeIndex} * (${slotSize} + var(--ls-gap, 10px)) + ${slotSize} / 2)`;

  const sizePx = `${size}px`;
  const offsetPx = `${offset}px`;
  const resolvedColor = color ? getThemeColor(color, theme) : undefined;

  const indicatorStyle: React.CSSProperties = {
    '--ls-indicator-size': sizePx,
    '--ls-indicator-offset': offsetPx,
    ...(resolvedColor ? { '--ls-indicator-color': resolvedColor } : {}),
    transform: isVertical ? `translateY(${translateOffset})` : `translateX(${translateOffset})`,
  } as React.CSSProperties;

  return (
    <Box
      ref={ref}
      {...ctx.getStyles('indicator')}
      {...others}
      style={indicatorStyle}
      data-orientation={ctx.orientation}
      data-variant={variant}
      data-active-index={activeIndex}
    >
      {children ?? <span />}
    </Box>
  );
});

LensSelectIndicator.displayName = 'LensSelectIndicator';
