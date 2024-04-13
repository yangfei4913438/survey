import { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

const useResize = () => {
  const [realWidth, setWidth] = useState(0);
  const [realHeight, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const {
    width = ref.current?.getBoundingClientRect().width || 448,
    height = ref.current?.getBoundingClientRect().height || 596,
  } = useResizeObserver<HTMLDivElement>({
    ref: ref,
    box: 'border-box',
    round: Math.floor,
    onResize: ({ width, height }) => {
      setWidth(width as number);
      setHeight(
        height ??
          ref.current?.getBoundingClientRect().height ??
          document.body.getBoundingClientRect().height
      );
    },
  });

  return {
    resizeRef: ref,
    width: realWidth > 0 ? realWidth : width,
    height: realHeight > 0 ? realHeight : height,
  };
};

export default useResize;
