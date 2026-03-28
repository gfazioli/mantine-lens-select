import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Paper, Stack, Text, Tooltip } from '@mantine/core';
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
import { Paper, Stack, Text, Tooltip } from '@mantine/core';

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
        p="xs"
        radius="lg"
        withBorder
        style={{
          backgroundColor: 'var(--mantine-color-dark-7)',
          borderColor: 'var(--mantine-color-dark-4)',
        }}
      >
        <LensSelect
          data={apps}
          value={active}
          onChange={setActive}
          itemSize={48}
          gap={6}
          magnification={1.8}
          lensRange={3}
          renderItem={(item, { scale }) => (
            <Tooltip label={String(item.value)} position="top" withArrow>
              <span style={{ fontSize: \`\${scale * 24}px\`, lineHeight: 1, cursor: 'pointer' }}>
                {item.view}
              </span>
            </Tooltip>
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
        p="xs"
        radius="lg"
        withBorder
        style={{
          backgroundColor: 'var(--mantine-color-dark-7)',
          borderColor: 'var(--mantine-color-dark-4)',
        }}
      >
        <LensSelect
          data={DOCK_APPS}
          value={active}
          onChange={setActive}
          itemSize={48}
          gap={6}
          magnification={1.8}
          lensRange={3}
          renderItem={(item, { scale }) => (
            <Tooltip label={String(item.value)} position="top" withArrow>
              <span style={{ fontSize: `${scale * 24}px`, lineHeight: 1, cursor: 'pointer' }}>
                {item.view}
              </span>
            </Tooltip>
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
