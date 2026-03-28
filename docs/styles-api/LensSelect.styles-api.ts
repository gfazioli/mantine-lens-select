import { LensSelectFactory } from '@gfazioli/mantine-lens-select';
import type { StylesApiData } from '../components/styles-api.types';

export const LensSelectStylesApi: StylesApiData<LensSelectFactory> = {
  selectors: {
    root: 'Root element — wraps track and indicator',
    track: 'Track element — contains all items in a flex row/column',
    item: 'Individual item element — fixed size container with overflow visible',
    itemContent: 'Inner content wrapper — receives scale/opacity/blur transforms',
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
      '--ls-pill-height': 'Controls the height of the default pill',
      '--ls-pill-width': 'Controls the width (thickness) of the default pill',
      '--ls-pill-radius': 'Controls the border radius of the default pill',
      '--ls-pill-color': 'Controls the color of inactive pills',
      '--ls-pill-color-hover': 'Controls the color of hovered (non-active) pills',
      '--ls-pill-color-active': 'Controls the color of the active pill',
      '--ls-easing':
        'Controls the transition easing function (linear, ease-out, ease-in-out, spring, or custom)',
    },
  },

  modifiers: [
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'default | outline',
      condition: 'Based on `variant` prop',
    },
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
    {
      modifier: 'data-pill',
      selector: 'item',
      condition: 'Item uses default pill rendering (no `view` provided)',
    },
    {
      modifier: 'data-hovered',
      selector: 'itemPill',
      condition: 'Pill is under cursor but not selected',
    },
    {
      modifier: 'data-variant',
      selector: 'indicator',
      value: 'default | outline',
      condition: 'Based on `LensSelect.Indicator` `variant` prop',
    },
  ],
};
