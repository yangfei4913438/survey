import useRequest from 'ahooks/es/useRequest';
import message from 'antd/es/message';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { copyQuestionServices } from '@/services/question';
import useQuestions from '@/store/hooks/useQuestions';

const useCopySurvey = (sid: string) => {
  const { goToRoute } = useProjectRoute();
  const { questions, setPageList } = useQuestions();

  // 复制问卷
  const { loading: copyLoading, run: copySurvey } = useRequest(
    async () => {
      return await copyQuestionServices<questionType>(sid);
    },
    {
      manual: true,
      onSuccess: async (question) => {
        await message.success('复制成功', 1).then(() => {
          // 更新内存数据, 保证用户体验
          setPageList([question].concat(questions.list));
          // 编辑问卷
          const target = surveyPath.edit(question.id);
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
