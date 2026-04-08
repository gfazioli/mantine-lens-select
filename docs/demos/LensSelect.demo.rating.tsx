import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | number>(5);

  return (
    <Stack align="center" gap="md">
      <Text size="sm" fw={500}>Volume: {String(value)}/10</Text>
      <LensSelect
        count={10}
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
        count={10}
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
