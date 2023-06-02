import React, { FC } from 'react';

import ListSearch from '@/components/ListSearch';

interface IListTitle {
  name: string;
}

const ListTitle: FC<IListTitle> = ({ name }) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='prose prose-lg'>
        <span className='prose prose-2xl font-bold'>{name}</span>
      </div>
      <div className=''>
        <ListSearch />
      </div>
    </div>
  );
};

export default ListTitle;
