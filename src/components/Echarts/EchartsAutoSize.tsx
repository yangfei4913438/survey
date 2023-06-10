import { FC } from 'react';
import AutoSize from 'react-virtualized-auto-sizer';

import { EchartsReact } from './EchartsReact';
import type { EchartsProps } from './types';

type AutoSizeProps = {
  height: number;
  scaledHeight: number;
  scaledWidth: number;
  width: number;
};

export const EchartsAutoSize: FC<EchartsProps> = (props) => {
  return (
    <AutoSize style={{ width: 'unset', height: 'unset' }}>
      {({ width, height }: AutoSizeProps) => {
        return <EchartsReact {...props} width={width} height={height} />;
      }}
    </AutoSize>
  );
};

EchartsAutoSize.displayName = 'EchartsAutoSize';
