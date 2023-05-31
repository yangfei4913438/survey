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
    <section className={styles.container}>
      <article className={styles.left}>
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
            type={currentRoutePath.startsWith(routePath.manageStart) ? 'default' : 'text'}
            size='large'
            icon={<StarOutlined />}
            onClick={() => goToRoute(routePath.manageStart)}
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
      <article className={styles.right}>
        <Outlet />
      </article>
    </section>
  );
};

export default ManageLayout;
