import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const LEVELS: LensSelectItem[] = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
}));

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

const levels = Array.from({ length: 10 }, (_, i) => ({ value: i + 1 }));

function Demo() {
  const [value, setValue] = useState<string | number>(5);

  return (
    <Stack align="center" gap="md">
      <Text size="sm" fw={500}>Volume: {String(value)}/10</Text>
      <LensSelect
        data={levels}
        value={value}
        onChange={setValue}
        itemSize={32}
        gap={3}
        pillWidth={6}
        magnification={1.5}
        lensRange={2}
        activeColor="teal"
        hoverColor="teal"
        indicatorProps={{ color: 'teal', size: 4 }}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>(5);

  return (
    <Stack align="center" gap="md">
      <Text size="sm" fw={500}>
        Volume: {String(value)}/10
      </Text>
      <LensSelect
        data={LEVELS}
        value={value}
        onChange={setValue}
        itemSize={32}
        gap={3}
        pillWidth={6}
        magnification={1.5}
        lensRange={2}
        activeColor="teal"
        hoverColor="teal"
        indicatorProps={{ color: 'teal', size: 4 }}
      />
    </Stack>
  );
}

export const rating: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
