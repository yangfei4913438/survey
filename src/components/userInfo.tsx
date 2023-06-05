import { UserOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';

import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';
import useUserInfo from '@/hooks/useUserInfo';

const UserInfo = () => {
  const { Link, goToRoute } = useProjectRoute();

  const { loading, userInfo, resetUserInfo } = useUserInfo();

  const logoutHandler = () => {
    localCache.clear();
    resetUserInfo();
    goToRoute(routePath.login);
  };

  const User = (
    <>
      <span className='prose-sm text-white'>
        <UserOutlined />
        {userInfo.nickname || userInfo.username}
      </span>
      <Button type='link' onClick={logoutHandler}>
        退出
      </Button>
    </>
  );

  const Login = loading ? (
    <Spin />
  ) : (
    <Link to={routePath.login} className='prose-sm text-lg text-blue-500 decoration-transparent'>
      登录
    </Link>
  );

  return <div className=''>{userInfo.username ? User : Login}</div>;
};

export default UserInfo;
