import { Global } from '@mantine/core';
import bold from '../font/BatonTurboBold.woff2';
import heavy from '../font/BatonTurboHeavy.woff2';
import medium from '../font/BatonTurboMedium.woff2';
import regular from '../font/BatonTurboRegular.woff2';

const CustomFont = () => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Baton Turbo',
            src: `url('${regular}') format('woff2')`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Baton Turbo',
            src: `url('${medium}') format('woff2')`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        {
            '@font-face': {
              fontFamily: 'Baton Turbo',
              src: `url('${bold}') format('woff2')`,
              fontWeight: 700,
              fontStyle: 'normal',
            },
          },
        {
            '@font-face': {
              fontFamily: 'Baton Turbo',
              src: `url('${heavy}') format('woff2')`,
              fontWeight: 900,
              fontStyle: 'normal',
            },
          },
      ]}
    />
  );
}

export default CustomFont