import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const DAYS: LensSelectItem[] = [
  {
    value: 'Mon',
    view: (
      <Text size="xs" fw={600}>
        Mon
      </Text>
    ),
  },
  {
    value: 'Tue',
    view: (
      <Text size="xs" fw={600}>
        Tue
      </Text>
    ),
  },
  {
    value: 'Wed',
    view: (
      <Text size="xs" fw={600}>
        Wed
      </Text>
    ),
  },
  {
    value: 'Thu',
    view: (
      <Text size="xs" fw={600}>
        Thu
      </Text>
    ),
  },
  {
    value: 'Fri',
    view: (
      <Text size="xs" fw={600}>
        Fri
      </Text>
    ),
  },
  {
    value: 'Sat',
    view: (
      <Text size="xs" fw={600} c="red">
        Sat
      </Text>
    ),
  },
  {
    value: 'Sun',
    view: (
      <Text size="xs" fw={600} c="red">
        Sun
      </Text>
    ),
  },
];

const code = `
import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

const DAYS: LensSelectItem[] = [
  { value: 'Mon', view: <Text size="xs" fw={600}>Mon</Text> },
  { value: 'Tue', view: <Text size="xs" fw={600}>Tue</Text> },
  { value: 'Wed', view: <Text size="xs" fw={600}>Wed</Text> },
  { value: 'Thu', view: <Text size="xs" fw={600}>Thu</Text> },
  { value: 'Fri', view: <Text size="xs" fw={600}>Fri</Text> },
  { value: 'Sat', view: <Text size="xs" fw={600} c="red">Sat</Text> },
  { value: 'Sun', view: <Text size="xs" fw={600} c="red">Sun</Text> },
];

function Demo() {
  const [day, setDay] = useState<string | number>('Mon');
  const isWeekend = day === 'Sat' || day === 'Sun';

  return (
    <Stack align="center" gap={32}>
      <Text size="sm" fw={500} c={isWeekend ? 'red' : undefined}>
        Selected: {String(day)}
      </Text>
      <LensSelect
        data={DAYS}
        value={day}
        onChange={setDay}
        itemSize={36}
        magnification={1.8}
        lensRange={2}
        activeColor={isWeekend ? 'red' : 'blue'}
        indicatorProps={{ color: isWeekend ? 'red' : 'blue' }}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [day, setDay] = useState<string | number>('Mon');
  const isWeekend = day === 'Sat' || day === 'Sun';

  return (
    <Stack align="center" gap={32}>
      <Text size="sm" fw={500} c={isWeekend ? 'red' : undefined}>
        Selected: {String(day)}
      </Text>
      <LensSelect
        data={DAYS}
        value={day}
        onChange={setDay}
        itemSize={36}
        magnification={1.8}
        lensRange={2}
        activeColor={isWeekend ? 'red' : 'blue'}
        indicatorProps={{ color: isWeekend ? 'red' : 'blue' }}
      />
    </Stack>
  );
}

export const weekdays: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
