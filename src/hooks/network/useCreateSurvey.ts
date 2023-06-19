import useRequest from 'ahooks/es/useRequest';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { createQuestionServices } from '@/services/question';

const useCreateSurvey = () => {
  const { goToRoute } = useProjectRoute();

  // 业务逻辑：从后台拿到新的ID, 然后跳转到编辑问卷的页面，走编辑问卷流程。
  const { loading, run: handleCreate } = useRequest(
    async () => {
      return await createQuestionServices<{ id: string }>();
    },
    {
      manual: true, // 手动触发
      onSuccess: ({ id }) => {
        // 编辑问卷
        const editorUrl = surveyPath.edit(id);
        // 跳转路由
        goToRoute<typeof editorUrl>(editorUrl);
      },
    }
  );

  return {
    loading,
    handleCreate,
  };
};

export default useCreateSurvey;
