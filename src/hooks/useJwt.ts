import { useLayoutEffect } from 'react';

import { cacheKeys } from '@/consts/cache';
import { routePath } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';

const useJwt = () => {
  const { goToRoute, isLoginPage, isRegisterPage, isHomePage } = useProjectRoute();

  /**
   * 是否已经登录
   * 存在token，就表示当前用户已经登录了。
   */
  const alreadyLogged = !!localCache.getItem(cacheKeys.token);

  // 不需要等到页面渲染完成，直接就阻塞执行了
  useLayoutEffect(() => {
    // 首页不检查权限
    if (isHomePage) return;

    // 没有登录，当前不是登录页，也不是注册页
    if (!alreadyLogged && !isLoginPage && !isRegisterPage) {
      // 跳转登录页
      return goToRoute(routePath.login);
    }
    // 已经登录，是登陆页或注册页
    if (alreadyLogged && (isLoginPage || isRegisterPage)) {
      // 跳转列表页
      return goToRoute(routePath.manageList);
    }
  }, [alreadyLogged, goToRoute, isHomePage, isLoginPage, isRegisterPage]);
};

export default useJwt;
