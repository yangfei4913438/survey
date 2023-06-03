import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Popconfirm, Space, Tag } from 'antd';
import { FC } from 'react';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const { confirm } = Modal;

export interface IListCard {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}

// 列表卡片
const ListCard: FC<IListCard> = ({ _id, title, createdAt, answerCount, isPublished, isStar }) => {
  const { goToRoute, Link } = useProjectRoute();

  // 编辑问卷
  const editorUrl = surveyPath.edit(_id);
  // 统计问卷
  const statUrl = surveyPath.stat(_id);

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk: () => undefined,
    });
  }

  return (
    <article className={'w-full rounded bg-white p-3 hover:shadow-lg'}>
      <div className='flex'>
        <div className='flex-1'>
          <Link to={isPublished ? statUrl : editorUrl}>
            <div className='flex items-center space-x-1'>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              <span>{title}</span>
            </div>
          </Link>
        </div>
        <div className='text-right text-small'>
          <Space>
            {isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>

      <Divider className='my-3' />

      <div className='flex'>
        <div className='flex flex-1'>
          <Button
            icon={<EditOutlined />}
            type='text'
            size='small'
            onClick={() => goToRoute<typeof editorUrl>(editorUrl)}
          >
            编辑问卷
          </Button>
          <Button
            icon={<LineChartOutlined />}
            type='text'
            size='small'
            onClick={() => goToRoute<typeof statUrl>(statUrl)}
            disabled={!isPublished}
          >
            问卷统计
          </Button>
        </div>
        <div className='flex text-right'>
          <Button
            type='text'
            icon={<StarOutlined />}
            size='small'
            // onClick={changeStar}
            // disabled={changeStarLoading}
          >
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title='确定复制该问卷？'
            okText='确定'
            cancelText='取消'
            // onConfirm={duplicate}
          >
            <Button
              type='text'
              icon={<CopyOutlined />}
              size='small'
              // disabled={duplicateLoading}
            >
              复制
            </Button>
          </Popconfirm>
          <Button
            type='text'
            icon={<DeleteOutlined />}
            size='small'
            onClick={del}
            // disabled={deleteLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ListCard;
