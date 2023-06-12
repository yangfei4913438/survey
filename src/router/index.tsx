import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { routePath } from '@/consts/routes';
import MainLayout from '@/layouts/mainLayout';
import Home from '@/pages/home';

// 组件懒加载
const ManageLayout = lazy(
  () => import(/* webpackChunkName: 'ManageLayout' */ '@/layouts/manageLayout')
);
const SurveyLayout = lazy(
  () => import(/* webpackChunkName: 'SurveyLayout' */ '@/layouts/surveyLayout')
);
const ManageList = lazy(() => import(/* webpackChunkName: 'ManageList' */ '@/pages/manage/list'));
const ManageStar = lazy(() => import(/* webpackChunkName: 'ManageStar' */ '@/pages/manage/star'));
const ManageTrash = lazy(
  () => import(/* webpackChunkName: 'ManageTrash' */ '@/pages/manage/trash')
);
const SurveyEdit = lazy(() => import(/* webpackChunkName: 'SurveyEdit' */ '@/pages/survey/edit'));
const SurveyStat = lazy(() => import(/* webpackChunkName: 'SurveyStat' */ '@/pages/survey/stat'));
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */ '@/pages/notFound'));
const Login = lazy(() => import(/* webpackChunkName: 'Login' */ '@/pages/login'));
const Register = lazy(() => import(/* webpackChunkName: 'Register' */ '@/pages/register'));

// 路由列表
const routes: RouteObject[] = [
  {
    path: routePath.home,
    element: <MainLayout />,
    children: [
      {
        path: routePath.home,
        element: <Home />,
      },
      {
        path: routePath.login,
        element: <Login />,
      },
      {
        path: routePath.register,
        element: <Register />,
      },
      {
        path: routePath.manage,
        element: <ManageLayout />,
        children: [
          {
            path: routePath.manageList,
            element: <ManageList />,
          },
          {
            path: routePath.manageStar,
            element: <ManageStar />,
          },
          {
            path: routePath.manageTrash,
            element: <ManageTrash />,
          },
        ],
      },
      {
        path: '*', // 这里的*要放在最后，表示匹配不到的路由，都来这里。
        element: <NotFound />,
      },
    ],
  },
  {
    path: routePath.survey,
    element: <SurveyLayout />,
    children: [
      {
        path: routePath.surveyEdit,
        element: <SurveyEdit />,
      },
      {
        path: routePath.surveyStat,
        element: <SurveyStat />,
      },
    ],
  },
];

// 导出路由
export const browserRouter = createBrowserRouter(routes);
