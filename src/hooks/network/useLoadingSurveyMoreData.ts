import { useDebounceFn, useRequest } from 'ahooks';
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { actionValues } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionsServices } from '@/services/question';

// 加载列表数据，类型：加载更多
const useLoadingSurveyMoreData = (loadMoreRef: React.RefObject<HTMLDivElement>) => {
  const { currentKeyword } = useProjectRoute();

  // 分页信息，这里的分页信息是自己管理了，不是通过路由获取来的。
  const [pageInfo, setPageInfo] = useImmer<SurveyPageInfoType>({
    page: actionValues.survey.defaultPage,
    pageSize: actionValues.survey.defaultPageSize,
    total: 0,
    list: [],
  });

  // 是否还有更多的数据
  const haveMoreData = pageInfo.total > pageInfo.list.length;

  // 真正加载
  const { loading, run: load } = useRequest(
    async () => {
      // 定义查询对象
      const params: any = { page: pageInfo.page, pageSize: pageInfo.pageSize };
      // 如果搜索关键字不存在，那么就不用加上了，这个和分页不一样。
      if (currentKeyword) {
        params.keyword = currentKeyword;
      }
      // 返回请求结果
      return await getQuestionsServices<ResultSurveySimpleType>(params);
    },
    {
      refreshDeps: [currentKeyword, pageInfo.page, pageInfo.pageSize], // 依赖项
      manual: true, // 手动触发
      onSuccess: (data) => {
        if (data?.list && data.list.length > 0) {
          setPageInfo((draft) => {
            draft.page++;
            draft.total = data.total;
            draft.list = draft.list.concat(data.list);
          });
        }
      },
    }
  );

  // 触发尝试加载
  const { run: tryLoadMore } = useDebounceFn(
    // 需要执行的函数体
    () => {
      const elem = loadMoreRef.current;
      if (!elem) return;

      // 拿到容器渲染后的数据
      const domRect = elem.getBoundingClientRect();
      // 比窗口的高度小了，表示进入视口了
      if (domRect.bottom < window.innerHeight) {
        load();
      }
    },
    {
      wait: 1000, // 等待时间，单位毫秒
    }
  );

  // 当页面加载，或查询关键字发生变化的时候，加载初始数据
  useEffect(() => {
    // 查询参数发生变化的时候，重置分页信息
    setPageInfo(() => ({
      page: actionValues.survey.defaultPage,
      pageSize: actionValues.survey.defaultPageSize,
      total: 0,
      list: [],
    }));
    // 首次加载，不需要任何判断
    load();
  }, [currentKeyword, load, setPageInfo]);

  // 监听滚动
  useEffect(() => {
    if (haveMoreData) {
      // 还有更多的数据，才需要加载更多，否则没必要
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [currentKeyword, haveMoreData, tryLoadMore]);

  return {
    // 分页信息
    pageInfo,
    // 加载状态
    loading,
    // 是否还有更多数据
    haveMoreData,
  };
};

export default useLoadingSurveyMoreData;
