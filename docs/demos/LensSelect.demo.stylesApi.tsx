import { LensSelect, type LensSelectItem } from '@gfazioli/mantine-lens-select';
import { MantineDemo } from '@mantinex/demo';
import { LensSelectStylesApi } from '../styles-api/LensSelect.styles-api';

const SAMPLE_DATA: LensSelectItem[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
}));

const code = `
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = Array.from({ length: 12 }, (_, i) => ({ value: i + 1 }));

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
