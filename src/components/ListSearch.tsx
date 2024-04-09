import { Input } from 'antd';
import { ChangeEvent, useState } from 'react';

import { actions } from '@/consts/actions';
import { RouteBaseType } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import useQuestions from '@/store/hooks/useQuestions';

const { Search } = Input;

const ListSearch = () => {
  const { currentKeyword } = useProjectRoute();

  const [value, setValue] = useState<string>(currentKeyword);
  const { goToRoute, currentRoutePath } = useProjectRoute();

  const { resetQuestions, questions } = useQuestions();

  // 执行搜索，把kv参数添加到路由
  const handleSearch = (val: string) => {
    const target = val.trim();
    // 搜索的时候，要重置数据
    resetQuestions();
    // 跳转路由
    goToRoute({
      pathname: currentRoutePath as RouteBaseType,
      search: target
        ? `${actions.survey.searchKey}=${target}&page=${questions.page}&pageSize=${questions.pageSize}`
        : '', // 如果值为空，需要清空搜索参数
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
