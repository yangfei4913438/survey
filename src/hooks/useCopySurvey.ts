import { useRequest } from 'ahooks';
import { message } from 'antd';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { copyQuestionServices } from '@/services/question';

const useCopySurvey = (id: string) => {
  const { goToRoute } = useProjectRoute();

  // 复制问卷
  const { loading: copyLoading, run: copySurvey } = useRequest(
    async () => {
      return await copyQuestionServices<{ id: string }>(id);
    },
    {
      manual: true,
      onSuccess: async ({ id }) => {
        console.log('id', id);
        await message.success('复制成功', 1).then(() => {
          // 编辑问卷
          const target = surveyPath.edit(id);
          // 路由跳转首页
          goToRoute<typeof target>(target);
        });
      },
      onError: () => {
        message.error('复制失败，请稍后再试');
      },
    }
  );

  return {
    copyLoading,
    copySurvey,
  };
};

export default useCopySurvey;
