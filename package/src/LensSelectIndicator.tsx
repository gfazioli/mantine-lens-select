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

  return (
    <Box
      ref={ref}
      {...ctx.getStyles('indicator')}
      {...others}
      data-orientation={ctx.orientation}
      data-active-index={activeIndex}
    >
      {children ?? <span />}
    </Box>
  );
});

LensSelectIndicator.displayName = 'LensSelectIndicator';
