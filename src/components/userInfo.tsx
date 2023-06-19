import UserOutlined from '@ant-design/icons/UserOutlined';
import Button from 'antd/es/button';
import Spin from 'antd/es/spin';
import { useLayoutEffect } from 'react';

import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useLoadingUserInfo from '@/hooks/network/useLoadingUserInfo';
import useUserInfo from '@/hooks/store/useUserInfo';
import useProjectRoute from '@/hooks/useProjectRoute';

const UserInfo = () => {
  const { Link, goToRoute } = useProjectRoute();
  const { userInfo, resetUserInfo } = useUserInfo();
  const { loadUserInfoLoading, loadUserInfo } = useLoadingUserInfo();

  useLayoutEffect(() => {
    if (!userInfo.username) {
      loadUserInfo();
    }
  }, [loadUserInfo, userInfo.username]);

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

  const Login = loadUserInfoLoading ? (
    <Spin />
  ) : (
    <Link to={routePath.login} className='prose-sm text-lg text-blue-500 decoration-transparent'>
      登录
    </Link>
  );

  return <div className=''>{userInfo.username ? User : Login}</div>;
};

export default UserInfo;
