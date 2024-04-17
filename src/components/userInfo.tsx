import UserOutlined from '@ant-design/icons/UserOutlined';
import useRequest from 'ahooks/es/useRequest';
import Button from 'antd/es/button';
import Spin from 'antd/es/spin';
import { useCallback, useMemo } from 'react';

import { cacheKeys } from '@/consts/cache';
import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getUserInfoServices } from '@/services/user';
import useQuestions from '@/store/hooks/useQuestions';
import useUserInfo from '@/store/hooks/useUserInfo';

const UserInfo = () => {
  const { Link, goToRoute } = useProjectRoute();

  const { setUserInfo, userInfo, resetUserInfo } = useUserInfo();

  const { resetQuestions } = useQuestions();

  /**
   * 是否已经登录
   * 存在token，就表示当前用户已经登录了。
   */
  const alreadyLogged = !!localCache.getItem(cacheKeys.token);

  // 当用户数据不存在的时候，自动发起用户数据的请求
  const { loading: loadUserInfoLoading, run: loadUserInfo } = useRequest(
    async () => {
      return await getUserInfoServices<LocalUserType>();
    },
    {
      ready: alreadyLogged && !userInfo.username,
      onSuccess: (data) => {
        // 更新用户数据
        setUserInfo({ username: data.username });
      },
    }
  );

  const logoutHandler = useCallback(() => {
    localCache.clear();
    resetUserInfo();
    resetQuestions();
    goToRoute(routePath.login);
  }, [goToRoute, resetQuestions, resetUserInfo]);

  const User = useMemo(
    () => (
      <div>
        <span className='prose-sm text-white'>
          <UserOutlined />
          {userInfo.username}
        </span>
        <Button type='link' onClick={logoutHandler}>
          退出
        </Button>
      </div>
    ),
    [logoutHandler, userInfo.username]
  );

  const Login = useMemo(() => {
    if (loadUserInfoLoading) {
      return <Spin />;
    }
    return (
      <Link to={routePath.login} className='prose-sm text-lg text-blue-500 decoration-transparent'>
        登录
      </Link>
    );
  }, [Link, loadUserInfoLoading]);

  if (userInfo.username) {
    return User;
  }
  return Login;
};

export default UserInfo;
