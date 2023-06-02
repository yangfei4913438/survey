import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/manage/layout.module.scss';

const ManageLayout: FC = () => {
  const { currentRoutePath, goToRoute } = useProjectRoute();

  return (
    <section className={styles.wrapper}>
      <article className='h-full w-40'>
        <Space direction='vertical'>
          <Button type='primary' size='large' icon={<PlusOutlined />}>
            新建问卷
          </Button>

          <Divider className='border-transparent' />

          <Button
            type={currentRoutePath.startsWith(routePath.manageList) ? 'default' : 'text'}
            size='large'
            icon={<BarsOutlined />}
            onClick={() => goToRoute(routePath.manageList)}
          >
            我的问卷
          </Button>
          <Button
            type={currentRoutePath.startsWith(routePath.manageStar) ? 'default' : 'text'}
            size='large'
            icon={<StarOutlined />}
            onClick={() => goToRoute(routePath.manageStar)}
          >
            星标问卷
          </Button>
          <Button
            type={currentRoutePath.startsWith(routePath.manageTrash) ? 'default' : 'text'}
            size='large'
            icon={<DeleteOutlined />}
            onClick={() => goToRoute(routePath.manageTrash)}
          >
            回收站
          </Button>
        </Space>
      </article>
      <article className='h-full flex-1'>
        <Outlet />
      </article>
    </section>
  );
};

export default ManageLayout;
