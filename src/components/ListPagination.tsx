import { Pagination } from 'antd';
import { FC, useEffect, useState } from 'react';

import { actions, actionValues } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';

interface IListPagination {
  total: number;
}

const ListPagination: FC<IListPagination> = ({ total }) => {
  const [current, setCurrent] = useState(actionValues.survey.defaultPage);
  const [pageSize, setPageSize] = useState(actionValues.survey.defaultPageSize);

  const { currentPageSize, currentPage, setSearchParams } = useProjectRoute();

  useEffect(() => {
    setCurrent(currentPage);
    setPageSize(currentPageSize);
  }, [currentPage, currentPageSize]);

  // 响应分页变更
  const handleChange = (page: number, pageSize: number) => {
    // 更新路由参数
    setSearchParams((prev) => {
      return {
        ...prev,
        [actions.survey.pageKey]: page,
        [actions.survey.pageSizeKey]: pageSize,
      };
    });
  };

  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={handleChange}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
    />
  );
};

export default ListPagination;
