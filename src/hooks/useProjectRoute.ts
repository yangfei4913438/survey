import { useMemo } from 'react';
import {
  Link,
  matchPath,
  type NavigateOptions,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { RoutePath, routePath } from '@/consts/routes';

const useProjectRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 当前是不是登陆页
  const isLoginPage = useMemo(() => {
    const match = matchPath(routePath.login, location.pathname);
    return match && match.pathname === match.pathnameBase;
  }, [location.pathname]);

  // 当前是不是注册页面
  const isRegisterPage = useMemo(() => {
    const match = matchPath(routePath.register, location.pathname);
    return match && match.pathname === match.pathnameBase;
  }, [location.pathname]);

  // 当前路由是不是一个404路由
  const is404Page = useMemo(
    () =>
      !Object.values(routePath).find((path) => {
        const match = matchPath(path, location.pathname);
        return match && match.pathname === match.pathnameBase;
      }),
    [location.pathname]
  );

  // 返回上个页面
  const toPrevRoute = () => navigate(-1);

  // 刷新页面
  const reFresh = () => navigate(0);

  // 跳转路由
  const goToRoute = <P>(routePath: RoutePath<P>, options?: NavigateOptions) =>
    navigate(routePath, options);

  return {
    isLoginPage,
    is404Page,
    isRegisterPage,
    // 当前路由
    currentRoutePath: location.pathname,
    toPrevRoute,
    goToRoute,
    reFresh,
    // 直接跳转路由的React组件
    Link,
    // 路由path参数获取
    pathParams: params,
    // 获取KV参数 https://www.xxx.com/user?name=tom
    searchParams,
    // 更新KV参数 https://www.xxx.com/user?name=tom
    setSearchParams,
  };
};

export default useProjectRoute;
