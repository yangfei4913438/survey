import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest, useTitle } from 'ahooks';
import { Button, Empty, message, Modal, Space, Spin, Table, Tag } from 'antd';
import cls from 'classnames';
import React, { FC, useState } from 'react';
import { useImmer } from 'use-immer';

import ListPagination from '@/components/ListPagination';
import ListTitle from '@/components/ListTitle';
import useLoadingSurveyListData from '@/hooks/network/useLoadingSurveyListData';
import { deleteSurveysService, updateQuestionServices } from '@/services/question';

const { confirm } = Modal;

const ManageTrash: FC = () => {
  // 设置页面标题
  useTitle('星星问卷 - 回收站');

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useImmer<React.Key[]>([]);
  const { loading, data, refresh } = useLoadingSurveyListData<ResultSurveySimpleType>({
    isDeleted: true,
  });

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ];

  // 恢复被删除的问卷（软删除恢复）
  // 调用更新接口
  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      // 发送更新请求
      for await (const id of selectedIds) {
        await updateQuestionServices(id as string, { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('恢复成功');
        // 清理内存
        setSelectedIds([]);
        // 刷新删除列表
        refresh();
      },
      onError: () => {
        message.error('恢复失败, 请稍后再试');
      },
    }
  );

  // 删除
  const { loading: delLoading, run: delRun } = useRequest(
    async () => {
      await deleteSurveysService(selectedIds as string[]);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        // 清理内存
        setSelectedIds([]);
        // 刷新删除列表
        refresh();
      },
      onError: () => {
        message.error('删除失败, 请稍后再试');
      },
    }
  );

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: delRun,
      okType: 'danger',
    });
  }

  const list = data?.list ?? [];
  const total = data?.total || 0;

  const TableJsx = () => {
    return (
      <div className='space-y-4 pb-8'>
        <Space>
          <Button
            type='primary'
            disabled={selectedIds.length === 0}
            onClick={recover}
            loading={recoverLoading}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del} loading={delLoading}>
            彻底删除
          </Button>
        </Space>
        <Table
          className='w-full'
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q.id}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedIds,
            onChange: (selectedRowKeys) => {
              setSelectedIds(selectedRowKeys);
            },
          }}
        />
        <div className='bg-white py-8 text-center'>
          <ListPagination total={total} />
        </div>
      </div>
    );
  };

  return (
    <div className={cls('h-full space-y-2 flex flex-col')}>
      <ListTitle name='回收站' />
      <div
        className={cls('w-full flex-1 ', {
          'h-full flex items-center justify-center': list.length === 0,
        })}
      >
        {/* 问卷列表 */}
        {list.length > 0 ? (
          <TableJsx />
        ) : loading ? (
          <Spin size={'large'} />
        ) : (
          <Empty description={'暂无数据'} />
        )}
      </div>
    </div>
  );
};

export default ManageTrash;
