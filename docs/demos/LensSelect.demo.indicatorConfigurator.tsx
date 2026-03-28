import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
}));

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = Array.from({ length: 12 }, (_, i) => ({ value: i + 1 }));

function Demo() {
  return (
    <LensSelect data={data} withIndicator={false}>
      <LensSelect.Indicator{{props}} />
    </LensSelect>
  );
}
`;

export const indicatorConfigurator: MantineDemo = {
  type: 'configurator',
  component: (props: any) => (
    <LensSelect data={SAMPLE_DATA} withIndicator={false}>
      <LensSelect.Indicator {...props} />
    </LensSelect>
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
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'number',
      prop: 'size',
      initialValue: 6,
      libraryValue: 6,
      min: 2,
      max: 16,
      step: 1,
    },
    {
      type: 'number',
      prop: 'offset',
      initialValue: 16,
      libraryValue: 16,
      min: 4,
      max: 32,
      step: 2,
    },
  ],
};
