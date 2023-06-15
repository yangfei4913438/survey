import type { FC, PropsWithChildren } from 'react';

const StorybookContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-sm rounded-md border border-solid border-gray-200 px-8 py-6 shadow hover:shadow-lg'>
      {children}
    </div>
  );
};

export default StorybookContainer;
