import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
  { value: 'photos', view: '📷' },
  { value: 'music', view: '🎵' },
  { value: 'notes', view: '📝' },
];

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
  { value: 'photos', view: '📷' },
  { value: 'music', view: '🎵' },
  { value: 'notes', view: '📝' },
];

function Demo() {
  return (
    <LensSelect{{props}} data={data} />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: (props: any) => <LensSelect {...props} data={SAMPLE_DATA} />,
  code,
  centered: true,
  controls: [
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
      initialValue: 48,
      libraryValue: 48,
      min: 24,
      max: 96,
      step: 8,
    },
    {
      type: 'number',
      prop: 'gap',
      initialValue: 8,
      libraryValue: 8,
      min: 0,
      max: 24,
      step: 2,
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
      initialValue: false,
      libraryValue: false,
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
  ],
};
