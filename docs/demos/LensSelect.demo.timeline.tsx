import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const EVENTS: LensSelectItem[] = [
  { value: 'Jan 2024' },
  { value: 'Feb 2024' },
  { value: 'Mar 2024' },
  { value: 'Apr 2024' },
  { value: 'May 2024' },
  { value: 'Jun 2024' },
  { value: 'Jul 2024' },
  { value: 'Aug 2024' },
  { value: 'Sep 2024' },
  { value: 'Oct 2024' },
  { value: 'Nov 2024' },
  { value: 'Dec 2024' },
  { value: 'Jan 2025' },
  { value: 'Feb 2025' },
  { value: 'Mar 2025' },
  { value: 'Apr 2025' },
  { value: 'May 2025' },
  { value: 'Jun 2025' },
  { value: 'Jul 2025' },
  { value: 'Aug 2025' },
  { value: 'Sep 2025' },
  { value: 'Oct 2025' },
  { value: 'Nov 2025' },
  { value: 'Dec 2025' },
];

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';

const events = [
  { value: 'Jan 2024' }, { value: 'Feb 2024' },
  { value: 'Mar 2024' }, { value: 'Apr 2024' },
  { value: 'May 2024' }, { value: 'Jun 2024' },
  { value: 'Jul 2024' }, { value: 'Aug 2024' },
  { value: 'Sep 2024' }, { value: 'Oct 2024' },
  { value: 'Nov 2024' }, { value: 'Dec 2024' },
  { value: 'Jan 2025' }, { value: 'Feb 2025' },
  { value: 'Mar 2025' }, { value: 'Apr 2025' },
  { value: 'May 2025' }, { value: 'Jun 2025' },
  { value: 'Jul 2025' }, { value: 'Aug 2025' },
  { value: 'Sep 2025' }, { value: 'Oct 2025' },
  { value: 'Nov 2025' }, { value: 'Dec 2025' },
];

function Demo() {
  const [date, setDate] = useState<string | number>('Dec 2025');

  return (
    <Group align="flex-start" gap="xl" justify="center">
      <LensSelect
        data={events}
        value={date}
        onChange={setDate}
        orientation="vertical"
        itemSize={16}
        gap={3}
        pillWidth={3}
        magnification={2}
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
        itemSize={16}
        gap={3}
        pillWidth={3}
        magnification={2}
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
