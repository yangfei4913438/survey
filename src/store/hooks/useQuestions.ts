import { useDispatch, useSelector } from 'react-redux';

import { ReduxStoreType } from '@/store';
import storeActions from '@/store/storeActions';

// 问卷列表
const useQuestions = () => {
  // 取出redux中的数据，第一个泛型是整个store的导出类型，第二个是目标命名空间的类型
  const questions = useSelector<ReduxStoreType, SurveyPagesType>((state) => state.questions);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置新的总数据
  const setPageTotal = (total: number) => {
    dispatch(storeActions.questions.setPageTotal(total));
  };

  // 设置新的列表数据
  const setPageList = (list: questionType[]) => {
    dispatch(storeActions.questions.setPageList(list));
  };

  // 设置页码
  const setPage = (page: number) => {
    dispatch(storeActions.questions.setPage(page));
  };

  // 设置每页数量
  const setPageSize = (pageSize: number) => {
    dispatch(storeActions.questions.setPageSize(pageSize));
  };

  // 重置数据为默认值
  const resetQuestions = () => {
    dispatch(storeActions.questions.resetQuestions());
  };

  // 返回
  return {
    questions,
    setPageTotal,
    setPageList,
    setPage,
    setPageSize,
    resetQuestions,
  };
};

export default useQuestions;
