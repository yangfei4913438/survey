import { useRequest } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionServices } from '@/services/question';
import storeActions from '@/store/storeActions';

const useEditorComponents = () => {
  const {
    pathParams: { id = '' },
  } = useProjectRoute();

  // 取出redux中的数据，第一个泛型是整个store的导出类型，第二个是目标命名空间的类型
  const { editorComponentList, selectedId } = useSelector<
    ReduxStoreType,
    EditorComponentsStateType
  >((state) => state.editorComponents);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置编辑器组件数据
  const resetEditorComponents = (state: EditorComponentsStateType) => {
    dispatch(storeActions.editorComponents.resetEditorComponents(state));
  };

  // 加载编辑器组件数据
  const { loading, error } = useRequest(
    async () => {
      return await getQuestionServices<ResultSurveyDetailType>(id);
    },
    {
      ready: !!id,
      onSuccess: ({ id, title, componentList }) => {
        let selectedId = '';
        if (componentList.length) {
          // 第一个组件默认选中
          selectedId = componentList[0].fe_id;
        }
        resetEditorComponents({ selectedId, editorComponentList: componentList });
      },
    }
  );

  // 设置选中ID
  const changeSelectedId = (id: string) => {
    dispatch(storeActions.editorComponents.changeSelectedId(id));
  };

  const clearSelectedId = () => {
    dispatch(storeActions.editorComponents.changeSelectedId(''));
  };

  return {
    loading,
    error,
    selectedId,
    editorComponentList,
    resetEditorComponents,
    changeSelectedId,
    clearSelectedId,
  };
};

export default useEditorComponents;
