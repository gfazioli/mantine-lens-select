import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

function Demo() {
  const [simple, setSimple] = useState<string | number>(1);
  const [range, setRange] = useState<string | number>(50);
  const [stepped, setStepped] = useState<string | number>(0);

  return (
    <Stack gap={48}>
      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>Simple count (1..15): {String(simple)}</Text>
        <LensSelect count={15} value={simple} onChange={setSimple} withIndicator />
      </Stack>

      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>Range 0–100 (20 pills): {String(range)}</Text>
        <LensSelect count={20} min={0} max={100} value={range} onChange={setRange} withIndicator />
      </Stack>

      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>Step 10 (0, 10, 20, ..., 100): {String(stepped)}</Text>
        <LensSelect min={0} max={100} step={10} value={stepped} onChange={setStepped} withIndicator />
      </Stack>
    </Stack>
  );
}
`;

function Demo() {
  const [simple, setSimple] = useState<string | number>(1);
  const [range, setRange] = useState<string | number>(50);
  const [stepped, setStepped] = useState<string | number>(0);

  return (
    <Stack gap={48}>
      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>
          Simple count (1..15): {String(simple)}
        </Text>
        <LensSelect count={15} value={simple} onChange={setSimple} withIndicator />
      </Stack>

      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>
          Range 0–100 (20 pills): {String(range)}
        </Text>
        <LensSelect count={20} min={0} max={100} value={range} onChange={setRange} withIndicator />
      </Stack>

      <Stack gap="md" align="center">
        <Text size="sm" fw={500}>
          Step 10 (0, 10, 20, ..., 100): {String(stepped)}
        </Text>
        <LensSelect
          min={0}
          max={100}
          step={10}
          value={stepped}
          onChange={setStepped}
          withIndicator
        />
      </Stack>
    </Stack>
  );
}

export const count: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
