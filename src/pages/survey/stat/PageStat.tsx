import { Empty, Spin, Table, Typography } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import ListPagination from '@/components/ListPagination';
import { interoperableTypes } from '@/consts/editorComponent';
import useLoadingSurveyStatListData from '@/hooks/network/useLoadingSurveyStatListData';
import useSurveyEditor from '@/hooks/store/useSurveyEditor';

const PageStat: FC = () => {
  const { visibleComponentList, changeSelectedId, selectedComponent } = useSurveyEditor();
  // 获取数据
  const { loading, data } = useLoadingSurveyStatListData<SurveyStatPageInfoType>();

  const list = data?.list || [];
  const total = data?.total || 0;

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  const columns = visibleComponentList
    .filter((c) => interoperableTypes.includes(c.type)) // 非输入列，不用展示
    .map((c) => {
      const { fe_id, title, props, type } = c;
      const colTitle = props!.title || title;

      return {
        title: (
          <div
            className={'cursor-pointer whitespace-nowrap'}
            onClick={() => {
              changeSelectedId(fe_id);
            }}
            key={fe_id}
          >
            <span
              className={cls(
                'hover:text-sky-500',
                fe_id === selectedComponent?.fe_id ? 'text-sky-300' : 'text-inherit'
              )}
            >
              {colTitle}
            </span>
          </div>
        ),
        key: fe_id, // 循环的key
        dataIndex: fe_id, // 匹配数据
      };
    });

  return (
    <div
      className={cls(
        'flex flex-col overflow-hidden rounded shadow hover:shadow-lg pt-4 px-4 bg-white'
      )}
    >
      <div className='p-4'>
        <Typography.Title level={3}>答卷数量: {!loading && total}</Typography.Title>
      </div>
      {columns.length > 0 ? (
        <>
          <Table
            className={'bg-inherit'}
            columns={columns}
            footer={() => <ListPagination total={total} defaultPageSize={8} />}
            dataSource={dataSource}
            pagination={false}
          />
        </>
      ) : loading ? (
        <Spin size={'large'} />
      ) : (
        <Empty description={'暂无数据'} />
      )}
    </div>
  );
};

export default PageStat;
