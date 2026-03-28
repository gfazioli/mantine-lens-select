import { useState } from 'react';
import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const STEPS: LensSelectItem[] = [
  { value: 'cart', view: '🛒' },
  { value: 'address', view: '📍' },
  { value: 'payment', view: '💳' },
  { value: 'review', view: '📋' },
  { value: 'confirm', view: '✅' },
];

const LABELS: Record<string, string> = {
  cart: 'Cart',
  address: 'Address',
  payment: 'Payment',
  review: 'Review',
  confirm: 'Confirm',
};

const code = `
import { useState } from 'react';
import { LensSelect } from '@gfazioli/mantine-lens-select';
import { Group, Stack, Text } from '@mantine/core';

const steps = [
  { value: 'cart', view: '🛒' },
  { value: 'address', view: '📍' },
  { value: 'payment', view: '💳' },
  { value: 'review', view: '📋' },
  { value: 'confirm', view: '✅' },
];

const labels = {
  cart: 'Cart', address: 'Address', payment: 'Payment',
  review: 'Review', confirm: 'Confirm',
};

function Demo() {
  const [step, setStep] = useState<string | number>('cart');

  return (
    <Stack align="center" gap="lg">
      <Group align="center" gap="lg">
        <LensSelect
          data={steps}
          value={step}
          onChange={setStep}
          itemSize={40}
          gap={12}
          magnification={1.4}
          lensRange={2}
          activeColor="violet"
          indicatorProps={{ color: 'violet' }}
        />
      </Group>
      <Text size="sm" fw={500}>
        Step: {labels[String(step)]}
      </Text>
    </Stack>
  );
}
`;

function Demo() {
  const [step, setStep] = useState<string | number>('cart');

  return (
    <Stack align="center" gap="lg">
      <Group align="center" gap="lg">
        <LensSelect
          data={STEPS}
          value={step}
          onChange={setStep}
          itemSize={40}
          gap={12}
          magnification={1.4}
          lensRange={2}
          activeColor="violet"
          indicatorProps={{ color: 'violet' }}
        />
      </Group>
      <Text size="sm" fw={500}>
        Step: {LABELS[String(step)]}
      </Text>
    </Stack>
  );
}

export const stepProgress: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
