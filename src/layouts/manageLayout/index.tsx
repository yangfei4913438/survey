import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Divider, Space } from 'antd';
import cls from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { routePath, surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { createQuestion } from '@/services/question';
import styles from '@/styles/base.module.scss';

const ManageLayout: FC = () => {
  const { currentRoutePath, goToRoute } = useProjectRoute();

  // 响应创建问卷
  // 业务逻辑：从后台拿到新的ID, 然后跳转到编辑问卷的页面，走编辑问卷流程。
  const { loading, run: handleCreate } = useRequest(
    async () => {
      return await createQuestion<{ id: string }>();
    },
    {
      manual: true, // 手动触发
      onSuccess: ({ id }) => {
        // 编辑问卷
        const editorUrl = surveyPath.edit(id);
        // 跳转路由
        goToRoute<typeof editorUrl>(editorUrl);
      },
    }
  );

  return (
    <section className={cls(styles.layout, 'pt-8 flex space-x-4 bg-slate-200')}>
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
      <article className='flex-1'>
        <Outlet />
      </article>
    </section>
  );
};

export default ManageLayout;
