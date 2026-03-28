import { createSafeContext, type GetStylesApi } from '@mantine/core';
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
}

export const [LensSelectProvider, useLensSelectContext] = createSafeContext<LensSelectContextValue>(
  'LensSelect component was not found in the tree'
);
