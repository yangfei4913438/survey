import { useTitle } from 'ahooks';
import useRequest from 'ahooks/es/useRequest';
import { Empty } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionsServices } from '@/services/question';
import useQuestions from '@/store/hooks/useQuestions';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');
  const { currentKeyword } = useProjectRoute();

  const { questions, setPageList, setPageTotal, setPage, resetQuestions } = useQuestions();

  // 真正加载
  const { run: load } = useRequest(
    async () => {
      // 定义查询对象
      const params: any = { page: questions.page, pageSize: questions.pageSize };
      // 如果搜索关键字不存在，那么就不用加上了
      if (currentKeyword) {
        params.keyword = currentKeyword;
      }
      // 返回请求结果
      return await getQuestionsServices<ResultSurveyDetailType>(params);
    },
    {
      refreshDeps: [currentKeyword, questions.page, questions.pageSize], // 依赖项
      onSuccess: (data) => {
        if (data?.list && data.list.length > 0) {
          setPage(questions.page + 1);
          setPageTotal(data.total);
          setPageList(questions.list.concat(data.list));
        }
      },
    }
  );

  return (
    <div className={cls('relative h-full pb-8 flex flex-col space-y-4')}>
      <ListTitle name={'我的问卷'} />
      <Virtuoso
        useWindowScroll={true}
        data={questions.list}
        totalCount={questions.total}
        overscan={3}
        endReached={load}
        itemContent={(index, item) => <ListCard key={item.id} {...item} index={index} />}
        components={{
          EmptyPlaceholder: () => {
            return <Empty description={'暂无数据'} />;
          },
          Footer: () => {
            return (
              <div
                className={cls(
                  'flex w-full items-center justify-center py-8 text-gray-500',
                  questions.list.length === 0 && 'hidden'
                )}
              >
                ---------- END ----------
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default ManageList;
