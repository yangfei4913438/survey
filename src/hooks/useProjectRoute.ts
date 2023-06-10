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

import { actions, actionValues } from '@/consts/actions';
import { RoutePath, routePath } from '@/consts/routes';

const useProjectRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 当前是不是首页《不需要访问权限》
  const isHomePage = location.pathname === '/';

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

  // 页码和每页的记录数，大概率是一个页面中经常会变化的值，所以没有缓存的必要性。只有变化频率小的值才有必要缓存。
  // 当前页码
  const currentPage = parseInt(searchParams.get(actions.survey.pageKey) || '0');
  // 当前的每页记录数量
  const currentPageSize = parseInt(searchParams.get(actions.survey.pageSizeKey) || '0');

  // 当前的搜索关键字
  const currentKeyword = searchParams.get(actions.survey.searchKey) || '';

  // 返回上个页面
  const toPrevRoute = () => navigate(-1);

  // 去下一个页面
  const toNextRoute = () => navigate(1);

  // 刷新页面
  const reFresh = () => navigate(0);

  // 跳转路由
  const goToRoute = <P>(routePath: RoutePath<P>, options?: NavigateOptions) =>
    navigate(routePath, options);

  return {
    isHomePage,
    isLoginPage,
    is404Page,
    isRegisterPage,
    currentPage,
    currentPageSize,
    currentKeyword,
    // 当前路由
    currentRoutePath: location.pathname,
    toPrevRoute,
    toNextRoute,
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
