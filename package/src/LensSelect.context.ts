import { createSafeContext, type GetStylesApi } from '@mantine/core';
import React from 'react';
import type { LensSelectFactory, LensSelectItem } from './LensSelect';

export type LensSelectOrientation = 'horizontal' | 'vertical';

export interface LensSelectContextValue {
  getStyles: GetStylesApi<LensSelectFactory>;
  items: LensSelectItem[];
  activeValue: string | number | undefined;
  orientation: LensSelectOrientation;
  /** Per-item scale factors computed from cursor distance, keyed by index */
  scaleFactors: number[];
  /** Whether the cursor is currently hovering over the track */
  isHovering: boolean;
  /** Whether items are rendered as pills (no custom view) */
  isPillMode: boolean;
  /** Ref to the track element */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Refs to each item element */
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const [LensSelectProvider, useLensSelectContext] = createSafeContext<LensSelectContextValue>(
  'LensSelect component was not found in the tree'
);
