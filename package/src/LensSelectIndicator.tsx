import React, { useEffect, useMemo, useState } from 'react';
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

export const LensSelectIndicator = factory<LensSelectIndicatorFactory>((_props) => {
  const props = useProps('LensSelectIndicator', defaultProps, _props);
  const { ref, ...propsWithoutRef } = props as typeof props & { ref?: React.Ref<HTMLDivElement> };
  const { children, variant, color, size, offset, ...others } = propsWithoutRef;

  const theme = useMantineTheme();
  const ctx = useLensSelectContext();

  const activeIndex = useMemo(
    () => ctx.items.findIndex((item) => item.value === ctx.activeValue),
    [ctx.items, ctx.activeValue]
  );

  // Track the real DOM position of the active item relative to the track
  const [indicatorOffset, setIndicatorOffset] = useState(0);

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }

    const updatePosition = () => {
      const track = ctx.trackRef.current;
      const activeEl = ctx.itemRefs.current[activeIndex];
      if (!track || !activeEl) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const isVertical = ctx.orientation === 'vertical';

      if (isVertical) {
        setIndicatorOffset(itemRect.top - trackRect.top + itemRect.height / 2);
      } else {
        setIndicatorOffset(itemRect.left - trackRect.left + itemRect.width / 2);
      }
    };

    // Update immediately and on each animation frame while hovering
    updatePosition();

    // Use a RAF loop to keep in sync with CSS transitions
    let rafId: number;
    const loop = () => {
      updatePosition();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [activeIndex, ctx.trackRef, ctx.itemRefs, ctx.orientation, ctx.scaleFactors]);

  if (activeIndex < 0) {
    return null;
  }

  const isVertical = ctx.orientation === 'vertical';
  const sizePx = `${size}px`;
  const offsetPx = `${offset}px`;
  const resolvedColor = color ? getThemeColor(color, theme) : undefined;

  const indicatorStyle: React.CSSProperties = {
    '--ls-indicator-size': sizePx,
    '--ls-indicator-offset': offsetPx,
    ...(resolvedColor ? { '--ls-indicator-color': resolvedColor } : {}),
    transform: isVertical ? `translateY(${indicatorOffset}px)` : `translateX(${indicatorOffset}px)`,
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
