import { Input } from 'antd';
import { ChangeEvent, useState } from 'react';

import { actions } from '@/consts/actions';
import { RouteBaseType } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const { Search } = Input;

const ListSearch = () => {
  const [value, setValue] = useState<string>('');
  const { goToRoute, currentRoutePath } = useProjectRoute();

  // 执行搜索，把kv参数添加到路由
  const handleSearch = (val: string) => {
    if (val) {
      goToRoute({
        pathname: currentRoutePath as RouteBaseType,
        search: `${actions.manage.searchKey}=${val}`,
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('input value:', event.target.value);
    setValue(event.target.value);
  };

  return (
    <Search
      size='large'
      allowClear
      placeholder='请输入关键字'
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};

export default ListSearch;