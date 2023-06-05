import { Input } from 'antd';
import { ChangeEvent, useState } from 'react';

import { actions } from '@/consts/actions';
import { RouteBaseType } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const { Search } = Input;

const ListSearch = () => {
  const { currentKeyword } = useProjectRoute();

  const [value, setValue] = useState<string>(currentKeyword);
  const { goToRoute, currentRoutePath } = useProjectRoute();

  // 执行搜索，把kv参数添加到路由
  const handleSearch = (val: string) => {
    goToRoute({
      pathname: currentRoutePath as RouteBaseType,
      search: val ? `${actions.survey.searchKey}=${val}` : '', // 如果值为空，需要清空搜索参数
    });
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
