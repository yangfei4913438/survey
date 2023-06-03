import { UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import { rules } from '@/consts/form';
import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/base.module.scss';

const Login: FC = () => {
  const { goToRoute, Link } = useProjectRoute();

  const handleFinish = (values: any) => {
    console.log('form:', values);
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
            <Button type='primary' htmlType='submit'>
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
