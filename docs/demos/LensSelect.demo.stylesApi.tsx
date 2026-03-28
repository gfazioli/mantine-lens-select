import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { MantineDemo } from '@mantinex/demo';
import { LensSelectStylesApi } from '../styles-api/LensSelect.styles-api';

const SAMPLE_DATA: LensSelectItem[] = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
];

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = [
  { value: 'home', view: '🏠' },
  { value: 'search', view: '🔍' },
  { value: 'mail', view: '📧' },
  { value: 'calendar', view: '📅' },
  { value: 'settings', view: '⚙️' },
];

function Demo() {
  return (
    <LensSelect{{props}} data={data} withIndicator />
  );
}
`;

function Demo(props: any) {
  return <LensSelect {...props} data={SAMPLE_DATA} withIndicator />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: LensSelectStylesApi,
  component: Demo,
  code,
  centered: true,
};
