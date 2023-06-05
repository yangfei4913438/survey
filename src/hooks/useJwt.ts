import { useLayoutEffect } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import useUserInfo from '@/hooks/useUserInfo';

const useJwt = () => {
  const { goToRoute, isLoginPage, isRegisterPage, isHomePage } = useProjectRoute();
  const { loading, userInfo } = useUserInfo();

  /**
   * 是否已经登录，
   * loading表示当前有权限了，只不过在重新获取用户信息过程中（失败会被全局重定向到登陆页）。
   * !!userInfo.username 表示当前已经有登录了。
   */
  const alreadyLogged = loading || !!userInfo.username;

  // 不需要等到页面渲染完成，直接就阻塞执行了
  useLayoutEffect(() => {
    // 首页不检查权限
    if (isHomePage) return;

    // 没有登录，当前不是登录页，也不是注册页
    if (!alreadyLogged && !isLoginPage && !isRegisterPage) {
      // 跳转登录页
      goToRoute(routePath.login);
    }
    // 已经登录，是登陆页或注册页
    if (alreadyLogged && (isLoginPage || isRegisterPage)) {
      // 跳转列表页
      goToRoute(routePath.manageList);
    }
  }, [alreadyLogged, goToRoute, isHomePage, isLoginPage, isRegisterPage]);
};

export default useJwt;
