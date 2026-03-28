import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Slider, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
}));

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Slider, Stack, Text } from '@mantine/core';

const data = Array.from({ length: 12 }, (_, i) => ({ value: i + 1 }));

function Demo() {
  const [value, setValue] = useState<string | number>(6);

  return (
    <Stack align="center" gap="xl">
      <LensSelect data={data} value={value} onChange={setValue} withIndicator />
      <Text size="sm">Selected: {String(value)}</Text>
      <Slider
        w={300}
        min={1}
        max={12}
        step={1}
        value={Number(value)}
        onChange={setValue}
        label={(v) => \`Item \${v}\`}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>(6);

  return (
    <Stack align="center" gap="xl">
      <LensSelect data={SAMPLE_DATA} value={value} onChange={setValue} withIndicator />
      <Text size="sm">Selected: {String(value)}</Text>
      <Slider
        w={300}
        min={1}
        max={12}
        step={1}
        value={Number(value)}
        onChange={setValue}
        label={(v) => `Item ${v}`}
      />
    </Stack>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
