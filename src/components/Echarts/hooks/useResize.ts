import { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

const useResize = () => {
  const [realWidth, setWidth] = useState(0);
  const [realHeight, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const { width = ref.current?.offsetWidth || 0, height = ref.current?.offsetHeight || 0 } =
    useResizeObserver<HTMLDivElement>({
      ref: ref,
      box: 'border-box',
      round: Math.floor,
      onResize: ({ width, height }) => {
        setWidth(width as number);
        setHeight(height ?? ref.current?.offsetHeight ?? document.body.offsetHeight);
      },
    });

  return {
    resizeRef: ref,
    width: realWidth > 0 ? realWidth : width,
    height: realHeight > 0 ? realHeight : height,
  };
};

export default useResize;
