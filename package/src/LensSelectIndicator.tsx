import React, { useMemo } from 'react';
import { Box, BoxProps, factory, Factory, StylesApiProps, useProps } from '@mantine/core';
import { useLensSelectContext } from './LensSelect.context';

export interface LensSelectIndicatorProps
  extends BoxProps, StylesApiProps<LensSelectIndicatorFactory> {
  /** Custom indicator content. If not provided, a default dot is rendered. */
  children?: React.ReactNode;
}

export type LensSelectIndicatorFactory = Factory<{
  props: LensSelectIndicatorProps;
  ref: HTMLDivElement;
  stylesNames: 'indicator';
}>;

const defaultProps: Partial<LensSelectIndicatorProps> = {};

export const LensSelectIndicator = factory<LensSelectIndicatorFactory>((_props, ref) => {
  const props = useProps('LensSelectIndicator', defaultProps, _props);
  const { children, ...others } = props;

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

  const offset = `calc(${activeIndex} * (${slotSize} + var(--ls-gap, 10px)) + ${slotSize} / 2)`;

  const indicatorStyle: React.CSSProperties = isVertical
    ? { transform: `translateY(${offset})` }
    : { transform: `translateX(${offset})` };

  return (
    <Box
      ref={ref}
      {...ctx.getStyles('indicator')}
      {...others}
      style={indicatorStyle}
      data-orientation={ctx.orientation}
      data-active-index={activeIndex}
    >
      {children ?? <span />}
    </Box>
  );
});

LensSelectIndicator.displayName = 'LensSelectIndicator';
