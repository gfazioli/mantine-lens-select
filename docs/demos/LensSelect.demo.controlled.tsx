import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
];

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

const data = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
];

function Demo() {
  const [value, setValue] = useState<string | number>('mail');

  return (
    <Stack align="center">
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect data={data} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>('mail');

  return (
    <Stack align="center">
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect data={SAMPLE_DATA} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
