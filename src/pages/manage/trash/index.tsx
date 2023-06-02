import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Space, Table, Tag } from 'antd';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

import ListTitle from '@/components/ListTitle';
import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/manage/list.module.scss';

const { confirm } = Modal;

const ManageTrash: FC = () => {
  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);

  const { searchParams } = useProjectRoute();

  useEffect(() => {
    console.log('trash params:', searchParams.get(actions.manage.searchKey));
  }, [searchParams]);

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

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => undefined,
    });
  }

  const TableJsx = () => {
    return (
      <div className='space-y-2'>
        <Space>
          <Button type='primary' disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
        <Table
          className='w-full'
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedIds,
            onChange: (selectedRowKeys) => {
              console.log('selectedRowKeys:', selectedRowKeys);
              setSelectedIds(selectedRowKeys);
            },
          }}
        />
      </div>
    );
  };

  return (
    <div className={classNames(styles.container, 'space-y-2')}>
      <ListTitle name='回收站' />
      <div className={list.length > 0 ? styles.content : styles.contentEmpty}>
        {/* 问卷列表 */}
        {list.length > 0 ? <TableJsx /> : <Empty description={'暂无数据'} />}
      </div>
      <div className={styles.footer}>{/*<div ref={containerRef}>{LoadMoreContentElem}</div>*/}</div>
    </div>
  );
};

export default ManageTrash;
