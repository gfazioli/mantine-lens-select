import React, { useState } from 'react';
import { Stack, Text } from '@mantine/core';
import { LensSelect, type LensSelectItem } from './LensSelect';

const SAMPLE_DATA: LensSelectItem[] = [
  { value: 'home', view: <Text size="sm">🏠</Text> },
  { value: 'search', view: <Text size="sm">🔍</Text> },
  { value: 'mail', view: <Text size="sm">📧</Text> },
  { value: 'calendar', view: <Text size="sm">📅</Text> },
  { value: 'settings', view: <Text size="sm">⚙️</Text> },
  { value: 'photos', view: <Text size="sm">📷</Text> },
  { value: 'music', view: <Text size="sm">🎵</Text> },
  { value: 'notes', view: <Text size="sm">📝</Text> },
];

export default {
  title: 'Components/LensSelect',
};

export function Usage() {
  return <LensSelect data={SAMPLE_DATA} />;
}

export function WithIndicator() {
  return <LensSelect data={SAMPLE_DATA} withIndicator />;
}

export function Vertical() {
  return <LensSelect data={SAMPLE_DATA} orientation="vertical" withIndicator />;
}

export function CustomMagnification() {
  return (
    <Stack>
      <Text size="sm">magnification=1.5</Text>
      <LensSelect data={SAMPLE_DATA} magnification={1.5} />
      <Text size="sm">magnification=3</Text>
      <LensSelect data={SAMPLE_DATA} magnification={3} />
    </Stack>
  );
}

export function WithOpacityAndBlur() {
  return <LensSelect data={SAMPLE_DATA} withOpacity withBlur withIndicator />;
}

export function Controlled() {
  const [value, setValue] = useState<string | number>('mail');
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect data={SAMPLE_DATA} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

export function Loop() {
  return <LensSelect data={SAMPLE_DATA} loop withIndicator />;
}

export function CustomRender() {
  return (
    <LensSelect
      data={SAMPLE_DATA}
      itemSize={56}
      renderItem={(item, { scale }) => (
        <div
          style={{
            fontSize: `${scale * 24}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {item.view}
        </div>
      )}
      withIndicator
    />
  );
}
