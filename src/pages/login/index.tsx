import { UserAddOutlined } from '@ant-design/icons';
import { useRequest, useTitle } from 'ahooks';
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import cls from 'classnames';
import React, { FC, useState } from 'react';

import { cacheKeys } from '@/consts/cache';
import { rules } from '@/consts/form';
import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useUserInfo from '@/hooks/store/useUserInfo';
import useProjectRoute from '@/hooks/useProjectRoute';
import { userLoginServices } from '@/services/user';
import styles from '@/styles/base.module.scss';

const Login: FC = () => {
  // 设置页面标题
  useTitle('星星问卷 - 登录');

  const { goToRoute, Link } = useProjectRoute();
  const { setUserInfo } = useUserInfo();
  const [remember, setRemember] = useState(false);

  const { run, loading } = useRequest(
    async (value: Omit<UserType, 'nickname'>) => {
      return await userLoginServices<UserLoginResult>(value);
    },
    {
      manual: true,
      onSuccess: ({ token, user }) => {
        // 记录token到浏览器
        localCache.setItem(cacheKeys.token, token, remember);
        // 记录用户信息到内存
        setUserInfo(user);
        // 提示用户，然后跳转路由
        message.success('登录成功', 1).then(() => {
          // 跳转到登录页面
          goToRoute(routePath.manageList);
        });
      },
      onError: () => {
        message.error('登录失败，请稍后再试');
      },
    }
  );

  const handleFinish = (values: Omit<UserType, 'nickname'> & { checked: boolean }) => {
    run({
      username: values.username,
      password: values.password,
    });
    setRemember(values.checked);
  };

  return (
    <article className={cls(styles.layout, styles.flexColCenter, 'space-y-8 bg-white')}>
      <header className='prose-sm'>
        <h1 className='space-x-2'>
          <UserAddOutlined />
          <span>用户登录</span>
        </h1>
      </header>
      <Form
        layout='horizontal'
        className='w-1/3'
        labelCol={{ span: 4, className: 'min-w-20' }}
        wrapperCol={{ span: 20 }}
        autoComplete={'off'}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <Form.Item label='用户名' name='username' rules={rules.username}>
          <Input />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={rules.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ className: 'ml-20' }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ className: 'ml-20' }}>
          <Space>
            <Button type='primary' htmlType='submit' loading={loading}>
              登录
            </Button>
            <Link to={routePath.register}>注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </article>
  );
};

export default Login;
