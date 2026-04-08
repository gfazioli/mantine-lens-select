import React, { useState } from 'react';
import {
  IconHome,
  IconSearch,
  IconMail,
  IconCalendar,
  IconSettings,
  IconPhoto,
  IconMusic,
  IconNote,
} from '@tabler/icons-react';
import { Stack, Text } from '@mantine/core';
import { LensSelect, type LensSelectItem } from './LensSelect';

// --- Data sets ---

const EMOJI_DATA: LensSelectItem[] = [
  { value: 'home', view: <Text size="sm">🏠</Text> },
  { value: 'search', view: <Text size="sm">🔍</Text> },
  { value: 'mail', view: <Text size="sm">📧</Text> },
  { value: 'calendar', view: <Text size="sm">📅</Text> },
  { value: 'settings', view: <Text size="sm">⚙️</Text> },
  { value: 'photos', view: <Text size="sm">📷</Text> },
  { value: 'music', view: <Text size="sm">🎵</Text> },
  { value: 'notes', view: <Text size="sm">📝</Text> },
];

const ICON_DATA: LensSelectItem[] = [
  { value: 'home', view: <IconHome size={20} /> },
  { value: 'search', view: <IconSearch size={20} /> },
  { value: 'mail', view: <IconMail size={20} /> },
  { value: 'calendar', view: <IconCalendar size={20} /> },
  { value: 'settings', view: <IconSettings size={20} /> },
  { value: 'photos', view: <IconPhoto size={20} /> },
  { value: 'music', view: <IconMusic size={20} /> },
  { value: 'notes', view: <IconNote size={20} /> },
];

const PILL_DATA: LensSelectItem[] = [
  { value: 'a' },
  { value: 'b' },
  { value: 'c' },
  { value: 'd' },
  { value: 'e' },
  { value: 'f' },
  { value: 'g' },
  { value: 'h' },
  { value: 'i' },
  { value: 'j' },
];

const TEXT_DATA: LensSelectItem[] = [
  {
    value: 'mon',
    view: (
      <Text size="xs" fw={600}>
        Mon
      </Text>
    ),
  },
  {
    value: 'tue',
    view: (
      <Text size="xs" fw={600}>
        Tue
      </Text>
    ),
  },
  {
    value: 'wed',
    view: (
      <Text size="xs" fw={600}>
        Wed
      </Text>
    ),
  },
  {
    value: 'thu',
    view: (
      <Text size="xs" fw={600}>
        Thu
      </Text>
    ),
  },
  {
    value: 'fri',
    view: (
      <Text size="xs" fw={600}>
        Fri
      </Text>
    ),
  },
  {
    value: 'sat',
    view: (
      <Text size="xs" fw={600}>
        Sat
      </Text>
    ),
  },
  {
    value: 'sun',
    view: (
      <Text size="xs" fw={600}>
        Sun
      </Text>
    ),
  },
];

export default {
  title: 'Components/LensSelect',
};

// --- Pills (no icons, no view) ---

export function Pills() {
  return <LensSelect data={PILL_DATA} withIndicator />;
}

export function PillsVertical() {
  return <LensSelect data={PILL_DATA} orientation="vertical" withIndicator />;
}

export function PillsCustomColors() {
  return (
    <LensSelect
      data={PILL_DATA}
      withIndicator
      pillColor="gray"
      hoverColor="blue"
      activeColor="red"
    />
  );
}

export function PillsWithEffects() {
  return <LensSelect data={PILL_DATA} withIndicator withOpacity withBlur expandOnHover />;
}

// --- Emoji icons ---

export function Emojis() {
  return <LensSelect data={EMOJI_DATA} withIndicator />;
}

export function EmojisVertical() {
  return <LensSelect data={EMOJI_DATA} orientation="vertical" withIndicator />;
}

// --- Tabler icons ---

export function TablerIcons() {
  return <LensSelect data={ICON_DATA} withIndicator />;
}

export function TablerIconsVertical() {
  return <LensSelect data={ICON_DATA} orientation="vertical" withIndicator />;
}

// --- Text labels ---

export function TextLabels() {
  return <LensSelect data={TEXT_DATA} itemSize={36} withIndicator />;
}

// --- Variants ---

export function OutlineVariant() {
  return <LensSelect data={EMOJI_DATA} variant="outline" withIndicator />;
}

export function OutlinePills() {
  return <LensSelect data={PILL_DATA} variant="outline" withIndicator />;
}

// --- Magnification ---

export function Magnification() {
  return (
    <Stack>
      <Text size="sm">magnification=1.5</Text>
      <LensSelect data={EMOJI_DATA} magnification={1.5} withIndicator />
      <Text size="sm">magnification=3</Text>
      <LensSelect data={EMOJI_DATA} magnification={3} withIndicator />
      <Text size="sm">magnification=1.5 (pills)</Text>
      <LensSelect data={PILL_DATA} magnification={1.5} withIndicator />
    </Stack>
  );
}

// --- Effects ---

export function WithOpacityAndBlur() {
  return <LensSelect data={EMOJI_DATA} withOpacity withBlur withIndicator />;
}

export function ExpandOnHover() {
  return <LensSelect data={EMOJI_DATA} expandOnHover withIndicator />;
}

export function AllEffects() {
  return <LensSelect data={EMOJI_DATA} withOpacity withBlur expandOnHover withIndicator />;
}

export function AllEffectsPills() {
  return <LensSelect data={PILL_DATA} withOpacity withBlur expandOnHover withIndicator />;
}

// --- Selection modes ---

export function HoverMode() {
  return <LensSelect data={EMOJI_DATA} selectionMode="hover" withIndicator />;
}

export function WheelMode() {
  return <LensSelect data={EMOJI_DATA} withWheel withIndicator />;
}

export function HoverWheelMode() {
  return <LensSelect data={EMOJI_DATA} selectionMode="hover" withWheel withIndicator />;
}

// --- Controlled ---

export function Controlled() {
  const [value, setValue] = useState<string | number>('mail');
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect data={EMOJI_DATA} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

export function ControlledPills() {
  const [value, setValue] = useState<string | number>('d');
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect data={PILL_DATA} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

// --- Loop ---

export function Loop() {
  return <LensSelect data={EMOJI_DATA} loop withIndicator />;
}

export function LoopPills() {
  return <LensSelect data={PILL_DATA} loop withIndicator />;
}

// --- Custom render ---

export function CustomRender() {
  return (
    <LensSelect
      data={EMOJI_DATA}
      itemSize={56}
      renderItem={(item: LensSelectItem, { scale }: { scale: number }) => (
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

// --- Count mode (no data) ---

export function CountBasic() {
  return <LensSelect count={15} withIndicator />;
}

export function CountWithRange() {
  const [value, setValue] = useState<string | number>(50);
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect count={20} min={0} max={100} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

export function CountWithStep() {
  const [value, setValue] = useState<string | number>(0);
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect min={0} max={100} step={10} value={value} onChange={setValue} withIndicator />
    </Stack>
  );
}

export function CountVertical() {
  return <LensSelect count={10} orientation="vertical" withIndicator />;
}

export function CountWithEffects() {
  return <LensSelect count={20} withOpacity withBlur expandOnHover withIndicator />;
}

export function CountSmallStep() {
  const [value, setValue] = useState<string | number>(0);
  return (
    <Stack>
      <Text size="sm">Selected: {String(value)}</Text>
      <LensSelect
        min={0}
        max={10}
        step={0.5}
        precision={1}
        value={value}
        onChange={setValue}
        withIndicator
      />
    </Stack>
  );
}

// --- Size variations ---

export function ItemSizes() {
  return (
    <Stack>
      <Text size="sm">itemSize=16</Text>
      <LensSelect data={PILL_DATA} itemSize={16} withIndicator />
      <Text size="sm">itemSize=24 (default)</Text>
      <LensSelect data={PILL_DATA} itemSize={24} withIndicator />
      <Text size="sm">itemSize=36</Text>
      <LensSelect data={PILL_DATA} itemSize={36} withIndicator />
      <Text size="sm">itemSize=48</Text>
      <LensSelect data={EMOJI_DATA} itemSize={48} withIndicator />
    </Stack>
  );
}
