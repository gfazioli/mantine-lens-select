import { LensSelectFactory } from '@gfazioli/mantine-lens-select';
import type { StylesApiData } from '../components/styles-api.types';

export const LensSelectStylesApi: StylesApiData<LensSelectFactory> = {
  selectors: {
    root: 'Root element — wraps track and indicator',
    track: 'Track element — contains all items in a flex row/column',
    item: 'Individual item element',
    itemPill: 'Default pill (rounded rectangle) rendered when view is not provided',
    indicator: 'Selection indicator element (dot/line below active item)',
  },

  vars: {
    root: {
      '--ls-transition-duration': 'Controls the transition duration for the lens effect',
      '--ls-item-size': 'Controls the base width and height of each item',
      '--ls-magnification': 'Controls the maximum magnification factor',
      '--ls-range': 'Controls how many adjacent items are influenced by the lens',
      '--ls-gap': 'Controls the gap between items',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: 'root',
      value: 'horizontal | vertical',
      condition: 'Based on `orientation` prop',
    },
    {
      modifier: 'data-active',
      selector: 'item',
      condition: 'Item is currently selected',
    },
  ],
};
