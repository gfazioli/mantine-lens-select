import { LensSelectIndicatorFactory } from '@gfazioli/mantine-lens-select';
import type { StylesApiData } from '../components/styles-api.types';

export const LensSelectIndicatorStylesApi: StylesApiData<LensSelectIndicatorFactory> = {
  selectors: {
    indicator: 'Indicator root element containing the dot',
  },

  vars: {},

  modifiers: [
    {
      modifier: 'data-variant',
      selector: 'indicator',
      value: 'default | outline',
      condition: 'Based on `variant` prop',
    },
    {
      modifier: 'data-orientation',
      selector: 'indicator',
      value: 'horizontal | vertical',
      condition: 'Inherited from parent LensSelect orientation',
    },
  ],
};
