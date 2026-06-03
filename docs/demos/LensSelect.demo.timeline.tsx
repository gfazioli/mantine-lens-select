import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const EVENTS: LensSelectItem[] = [2022, 2023, 2024, 2025].flatMap((year) =>
  MONTHS.map((month) => ({ value: `${month} ${year}` }))
);

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const events = [2022, 2023, 2024, 2025].flatMap((year) =>
  months.map((month) => ({ value: \`\${month} \${year}\` }))
);

function Demo() {
  const [date, setDate] = useState<string | number>('Dec 2025');

  return (
    <Group align="flex-start" gap="xl" justify="center">
      <LensSelect
        data={events}
        value={date}
        onChange={setDate}
        orientation="vertical"
        itemSize={12}
        gap={6}
        pillWidth={2}
        magnification={1.5}
        lensRange={2}
        activeColor="orange"
        hoverColor="orange"
        indicatorProps={{ color: 'orange', size: 5, offset: 12 }}
      />
      <Stack gap={4} pt={4}>
        <Text size="lg" fw={700}>{String(date)}</Text>
        <Text size="sm" c="dimmed">Selected date in the timeline</Text>
      </Stack>
    </Group>
  );
}
`;

function Demo() {
  const [date, setDate] = useState<string | number>('Dec 2025');

  return (
    <Group align="flex-start" gap="xl" justify="center">
      <LensSelect
        data={EVENTS}
        value={date}
        onChange={setDate}
        orientation="vertical"
        itemSize={12}
        gap={6}
        pillWidth={2}
        magnification={1.5}
        lensRange={2}
        activeColor="orange"
        hoverColor="orange"
        indicatorProps={{ color: 'orange', size: 5, offset: 12 }}
      />
      <Stack gap={4} pt={4}>
        <Text size="lg" fw={700}>
          {String(date)}
        </Text>
        <Text size="sm" c="dimmed">
          Selected date in the timeline
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
