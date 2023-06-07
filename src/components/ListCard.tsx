import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { FC, useState } from 'react';

import { surveyPath } from '@/consts/routes';
import useCopySurvey from '@/hooks/useCopySurvey';
import useProjectRoute from '@/hooks/useProjectRoute';
import useUpdateSurvey from '@/hooks/useUpdateSurvey';

const { confirm } = Modal;

export interface IListCard {
  id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}

// 列表卡片
const ListCard: FC<IListCard> = (surveyData) => {
  const { id, title, createdAt, answerCount, isPublished, isStar } = surveyData;

  const { goToRoute, Link } = useProjectRoute();

  const [starState, setStarState] = useState(isStar);

  // 复制问卷
  const { copySurvey, copyLoading } = useCopySurvey(id);

  // 更新问卷
  const { changeSurvey, changeSurveyLoading } = useUpdateSurvey({
    id,
    updateData: {
      isStar: !isStar, // 这里要把需要更新的数据，直接写好放进去，里面是没有逻辑的
    },
    onSuccess: () => {
      setStarState(!starState);
      message.success('更新成功');
    },
    onError: () => {
      message.error('更新失败, 请稍后再试');
    },
  });

  // 问卷是否已经被删除
  const [isDeleted, setIsDeleted] = useState(false);
  // 删除问卷（软删除）
  const { changeSurvey: delSurvey, changeSurveyLoading: delSurveyLoading } = useUpdateSurvey({
    id,
    updateData: {
      isDeleted: true,
    },
    onSuccess: () => {
      setIsDeleted(true);
      message.success('删除成功');
    },
    onError: () => {
      message.error('删除失败, 请稍后再试');
    },
  });
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk: delSurvey,
    });
  }
  // 如果已经被删除，就不再渲染
  if (isDeleted) return null;

  // 编辑问卷Url
  const editorUrl = surveyPath.edit(id);
  // 统计问卷Url
  const statUrl = surveyPath.stat(id);

  return (
    <article className={'w-full rounded bg-white p-3 hover:shadow-lg'}>
      <div className='flex'>
        <div className='flex-1'>
          <Link to={isPublished ? statUrl : editorUrl}>
            <div className='flex items-center space-x-1'>
              {starState && <StarOutlined style={{ color: 'red' }} />}
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
            onClick={changeSurvey}
            loading={changeSurveyLoading}
          >
            {starState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title='确定复制该问卷？'
            okText='确定'
            cancelText='取消'
            onConfirm={copySurvey}
          >
            <Button type='text' icon={<CopyOutlined />} size='small' loading={copyLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button
            type='text'
            icon={<DeleteOutlined />}
            size='small'
            onClick={del}
            loading={delSurveyLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ListCard;
