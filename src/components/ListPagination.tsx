import { Pagination } from 'antd';
import { FC, useLayoutEffect } from 'react';

import { actions, actionValues } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';

interface IListPagination {
  total: number;
  defaultPage?: number;
  defaultPageSize?: number;
}

const ListPagination: FC<IListPagination> = ({
  total,
  defaultPage = actionValues.survey.defaultPage,
  defaultPageSize = actionValues.survey.defaultPageSize,
}) => {
  const { currentPage, currentPageSize, setSearchParams } = useProjectRoute();

  useLayoutEffect(() => {
    if (currentPage <= 0 || currentPageSize <= 0) {
      // 更新路由参数
      setSearchParams((prev) => {
        return {
          ...prev,
          [actions.survey.pageKey]: defaultPage,
          [actions.survey.pageSizeKey]: defaultPageSize,
        };
      });
    }
  }, [currentPage, currentPageSize, defaultPage, defaultPageSize, setSearchParams]);

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
      current={currentPage}
      pageSize={currentPageSize}
      onChange={handleChange}
      pageSizeOptions={[defaultPageSize, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
    />
  );
};

export default ListPagination;
