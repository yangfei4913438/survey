import { FC } from 'react';

import { EchartsReact } from './EchartsReact';
import useResize from './hooks/useResize';
import type { EchartsProps } from './types';

export const EchartsAutoSize: FC<EchartsProps> = (props) => {
  // 监听外部容器的宽高
  const { resizeRef, width, height } = useResize();

  return (
    <div ref={resizeRef} className={'h-full w-full'}>
      <EchartsReact {...props} width={width} height={height} />
    </div>
  );
};

EchartsAutoSize.displayName = 'EchartsAutoSize';
