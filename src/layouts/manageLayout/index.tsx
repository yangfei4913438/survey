import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import cls from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { RoutePath, routePath } from '@/consts/routes';
import useCreateSurvey from '@/hooks/network/useCreateSurvey';
import useProjectRoute from '@/hooks/useProjectRoute';
import useQuestions from '@/store/hooks/useQuestions';
import styles from '@/styles/base.module.scss';

const ManageLayout: FC = () => {
  const { currentRoutePath, goToRoute } = useProjectRoute();

  // 响应创建问卷
  const { loading, handleCreate } = useCreateSurvey();

  const { resetQuestions } = useQuestions();

  // 响应跳转之前，先清空数据
  const handleCLick = (path: RoutePath<string>) => {
    resetQuestions();
    goToRoute(path);
  };

  return (
    <section className={cls(styles.layout, 'flex-1 pt-8 flex space-x-4')}>
      <article className='w-40'>
        <Space direction='vertical'>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            loading={loading}
            onClick={handleCreate}
          >
            新建问卷
          </Button>

          <Divider className='border-transparent' />

          <Button
            type={currentRoutePath.startsWith(routePath.manageList) ? 'default' : 'text'}
            size='large'
            icon={<BarsOutlined />}
            onClick={() => handleCLick(routePath.manageList)}
          >
            我的问卷
          </Button>
          <Button
            type={currentRoutePath.startsWith(routePath.manageStar) ? 'default' : 'text'}
            size='large'
            icon={<StarOutlined />}
            onClick={() => handleCLick(routePath.manageStar)}
          >
            星标问卷
          </Button>
          <Button
            type={currentRoutePath.startsWith(routePath.manageTrash) ? 'default' : 'text'}
            size='large'
            icon={<DeleteOutlined />}
            onClick={() => handleCLick(routePath.manageTrash)}
          >
            回收站
          </Button>
        </Space>
      </article>
      <article className='flex-1'>
        <Outlet />
      </article>
    </section>
  );
};

export default ManageLayout;
