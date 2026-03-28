import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Box, Paper, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const DOCK_APPS: LensSelectItem[] = [
  { value: 'finder', view: '📁' },
  { value: 'safari', view: '🧭' },
  { value: 'mail', view: '📧' },
  { value: 'photos', view: '📷' },
  { value: 'music', view: '🎵' },
  { value: 'calendar', view: '📅' },
  { value: 'notes', view: '📝' },
  { value: 'settings', view: '⚙️' },
  { value: 'terminal', view: '🖥️' },
  { value: 'appstore', view: '🛒' },
];

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Box, Paper, Stack, Text } from '@mantine/core';

const apps = [
  { value: 'finder', view: '📁' },
  { value: 'safari', view: '🧭' },
  { value: 'mail', view: '📧' },
  { value: 'photos', view: '📷' },
  { value: 'music', view: '🎵' },
  { value: 'calendar', view: '📅' },
  { value: 'notes', view: '📝' },
  { value: 'settings', view: '⚙️' },
  { value: 'terminal', view: '🖥️' },
  { value: 'appstore', view: '🛒' },
];

function Demo() {
  const [active, setActive] = useState<string | number>('finder');

  return (
    <Stack align="center" gap="md">
      <Paper
        px="lg"
        pt="md"
        pb="sm"
        radius="lg"
        withBorder
        style={{
          backgroundColor: 'light-dark(color-mix(in srgb, var(--mantine-color-gray-3) 60%, transparent), color-mix(in srgb, var(--mantine-color-gray-8) 20%, transparent))',
          borderColor: 'light-dark(var(--mantine-color-gray-4), var(--mantine-color-gray-7))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <LensSelect
          data={apps}
          value={active}
          onChange={setActive}
          itemSize={48}
          gap={4}
          magnification={2.5}
          lensRange={3}
          expandOnHover
          renderItem={(item, { active }) => (
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                background: active ? 'var(--mantine-color-blue-6)' : 'light-dark(var(--mantine-color-blue-1), var(--mantine-color-gray-8))',
                fontSize: 24,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {item.view}
            </Box>
          )}
          indicatorProps={{ size: 4, offset: 8 }}
        />
      </Paper>
      <Text size="xs" c="dimmed">Active: {String(active)}</Text>
    </Stack>
  );
}
`;

function Demo() {
  const [active, setActive] = useState<string | number>('finder');

  return (
    <Stack align="center" gap="md">
      <Paper
        px="lg"
        pt="md"
        pb="sm"
        radius="lg"
        withBorder
        style={{
          backgroundColor:
            'light-dark(color-mix(in srgb, var(--mantine-color-gray-3) 60%, transparent), color-mix(in srgb, var(--mantine-color-gray-8) 20%, transparent))',
          borderColor: 'light-dark(var(--mantine-color-gray-4), var(--mantine-color-gray-7))',
          backdropFilter: 'blur(20px)',
        }}
      >
        <LensSelect
          data={DOCK_APPS}
          value={active}
          onChange={setActive}
          itemSize={48}
          gap={4}
          magnification={2.5}
          lensRange={3}
          expandOnHover
          renderItem={(item, { active }) => (
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                background: active
                  ? 'var(--mantine-color-blue-6)'
                  : 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))',
                fontSize: 24,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {item.view}
            </Box>
          )}
          indicatorProps={{ size: 4, offset: 8 }}
        />
      </Paper>
      <Text size="xs" c="dimmed">
        Active: {String(active)}
      </Text>
    </Stack>
  );
}

export const dock: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
