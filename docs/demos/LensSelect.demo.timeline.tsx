import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const EVENTS: LensSelectItem[] = [
  { value: '2020' },
  { value: '2021' },
  { value: '2022' },
  { value: '2023' },
  { value: '2024' },
  { value: '2025' },
  { value: '2026' },
];

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';

const events = [
  { value: '2020' },
  { value: '2021' },
  { value: '2022' },
  { value: '2023' },
  { value: '2024' },
  { value: '2025' },
  { value: '2026' },
];

function Demo() {
  const [year, setYear] = useState<string | number>('2026');

  return (
    <Group align="flex-start" gap="xl" justify="center">
      <LensSelect
        data={events}
        value={year}
        onChange={setYear}
        orientation="vertical"
        itemSize={28}
        gap={6}
        pillWidth={3}
        magnification={2}
        lensRange={3}
        activeColor="orange"
        hoverColor="orange"
        indicatorProps={{ color: 'orange', offset: 12 }}
      />
      <Stack gap={4}>
        <Text size="lg" fw={700}>{String(year)}</Text>
        <Text size="sm" c="dimmed">Selected year in the timeline</Text>
      </Stack>
    </Group>
  );
}
`;

function Demo() {
  const [year, setYear] = useState<string | number>('2026');

  return (
    <Group align="flex-start" gap="xl" justify="center">
      <LensSelect
        data={EVENTS}
        value={year}
        onChange={setYear}
        orientation="vertical"
        itemSize={28}
        gap={6}
        pillWidth={3}
        magnification={2}
        lensRange={3}
        activeColor="orange"
        hoverColor="orange"
        indicatorProps={{ color: 'orange', offset: 12 }}
      />
      <Stack gap={4}>
        <Text size="lg" fw={700}>
          {String(year)}
        </Text>
        <Text size="sm" c="dimmed">
          Selected year in the timeline
        </Text>
      </Stack>
    </Group>
  );
}

export const timeline: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
