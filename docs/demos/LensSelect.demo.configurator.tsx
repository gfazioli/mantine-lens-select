import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = Array.from({ length: 32 }, (_, i) => ({
  value: String(i + 1),
}));

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = Array.from({ length: 32 }, (_, i) => ({ value: String(i + 1) }));

function Demo() {
  return (
    <LensSelect{{props}} data={data} />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: ({ pillHeight, ...props }: any) => (
    <LensSelect
      {...props}
      pillHeight={pillHeight != null ? `${pillHeight}%` : undefined}
      data={SAMPLE_DATA}
    />
  ),
  code,
  centered: true,
  controls: [
    {
      type: 'segmented',
      prop: 'variant',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { value: 'default', label: 'Default' },
        { value: 'outline', label: 'Outline' },
      ],
    },
    {
      type: 'segmented',
      prop: 'selectionMode',
      initialValue: 'click',
      libraryValue: 'click',
      data: [
        { value: 'click', label: 'Click' },
        { value: 'hover', label: 'Hover' },
      ],
    },
    {
      type: 'boolean',
      prop: 'withWheel',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'segmented',
      prop: 'orientation',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
    },
    {
      type: 'number',
      prop: 'magnification',
      initialValue: 2,
      libraryValue: 2,
      min: 1,
      max: 4,
      step: 0.5,
    },
    {
      type: 'number',
      prop: 'lensRange',
      initialValue: 3,
      libraryValue: 3,
      min: 1,
      max: 6,
      step: 1,
    },
    {
      type: 'number',
      prop: 'itemSize',
      initialValue: 24,
      libraryValue: 24,
      min: 12,
      max: 96,
      step: 8,
    },
    {
      type: 'boolean',
      prop: 'expandOnHover',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'gap',
      initialValue: 10,
      libraryValue: 10,
      min: 0,
      max: 24,
      step: 1,
    },
    {
      type: 'boolean',
      prop: 'withScale',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'withOpacity',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'withBlur',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'withIndicator',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'pillHeight',
      initialValue: 100,
      libraryValue: 100,
      min: 10,
      max: 100,
      step: 5,
    },
    {
      type: 'number',
      prop: 'pillWidth',
      initialValue: 4,
      libraryValue: 4,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      type: 'size',
      prop: 'pillRadius',
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      type: 'color',
      prop: 'pillColor',
      initialValue: 'gray',
      libraryValue: 'gray',
    },
    {
      type: 'color',
      prop: 'hoverColor',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'color',
      prop: 'activeColor',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'boolean',
      prop: 'loop',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'transitionDuration',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 1000,
      step: 50,
    },
    {
      type: 'select',
      prop: 'easing',
      initialValue: 'ease-out',
      libraryValue: 'ease-out',
      data: [
        { value: 'linear', label: 'Linear' },
        { value: 'ease-out', label: 'Ease Out' },
        { value: 'ease-in-out', label: 'Ease In Out' },
        { value: 'spring', label: 'Spring' },
      ],
    },
  ],
};
