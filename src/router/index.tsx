import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { routePath } from '@/consts/routes';
import MainLayout from '@/layouts/mainLayout';
import ManageLayout from '@/layouts/manageLayout';
import SurveyLayout from '@/layouts/surveyLayout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import ManageList from '@/pages/manage/list';
import ManageStart from '@/pages/manage/start';
import ManageTrash from '@/pages/manage/trash';
import NotFound from '@/pages/notFound';
import Register from '@/pages/register';
import SurveyEdit from '@/pages/survey/edit';
import SurveyStat from '@/pages/survey/stat';

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
            path: routePath.manageStart,
            element: <ManageStart />,
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
