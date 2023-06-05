import { UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button } from 'antd';

import { cacheKeys } from '@/consts/cache';
import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getUserInfoServices } from '@/services/user';

const UserInfo = () => {
  const { Link, goToRoute } = useProjectRoute();

  const { data, mutate } = useRequest(
    async () => {
      return await getUserInfoServices<Omit<UserType, 'password'>>();
    },
    {
      ready: !!localCache.getItem(cacheKeys.token),
    }
  );

  const { username, nickname } = data ?? {};

  const logoutHandler = () => {
    localCache.clear();
    mutate({ username: '', nickname: '' });
    goToRoute(routePath.login);
  };

  const User = (
    <>
      <span className='prose-sm text-white'>
        <UserOutlined />
        {nickname || username}
      </span>
      <Button type='link' onClick={logoutHandler}>
        退出
      </Button>
    </>
  );

  const Login = (
    <Link to={routePath.login} className='prose-sm text-lg text-blue-500 decoration-transparent'>
      登录
    </Link>
  );

  return <div className=''>{username ? User : Login}</div>;
};

export default UserInfo;
