import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const SAMPLE_DATA: LensSelectItem[] = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
}));

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Stack, Text } from '@mantine/core';

const data = Array.from({ length: 10 }, (_, i) => ({ value: i + 1 }));

function Demo() {
  return (
    <Stack align="center" gap="xl">
      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>Default variant</Text>
        <LensSelect data={data} />
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>Outline variant</Text>
        <LensSelect data={data} variant="outline" />
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>Outline variant with outline indicator</Text>
        <LensSelect data={data} variant="outline" withIndicator={false}>
          <LensSelect.Indicator variant="outline" />
        </LensSelect>
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>Default variant with outline indicator</Text>
        <LensSelect data={data} withIndicator={false}>
          <LensSelect.Indicator variant="outline" />
        </LensSelect>
      </Stack>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack align="center" gap="xl">
      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>
          Default variant
        </Text>
        <LensSelect data={SAMPLE_DATA} />
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>
          Outline variant
        </Text>
        <LensSelect data={SAMPLE_DATA} variant="outline" />
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>
          Outline variant with outline indicator
        </Text>
        <LensSelect data={SAMPLE_DATA} variant="outline" withIndicator={false}>
          <LensSelect.Indicator variant="outline" />
        </LensSelect>
      </Stack>

      <Stack align="center" gap="xs">
        <Text size="sm" fw={500}>
          Default variant with outline indicator
        </Text>
        <LensSelect data={SAMPLE_DATA} withIndicator={false}>
          <LensSelect.Indicator variant="outline" />
        </LensSelect>
      </Stack>
    </Stack>
  );
}

export const variants: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
