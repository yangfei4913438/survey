import { useRequest } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionServices } from '@/services/question';
import storeActions from '@/store/storeActions';

const useSurveyEditor = () => {
  const {
    pathParams: { id = '' },
  } = useProjectRoute();

  // 第一个泛型参数是整个store的导出类型，第二个泛型参数是目标命名空间的类型。下同。
  // 取出组件列表数据
  const { editorComponentList, selectedId, copiedComponent } = useSelector<
    ReduxStoreType,
    EditorComponentsStateType
  >((state) => state.editorComponents);

  // 取出页面数据
  const pageInfo = useSelector<ReduxStoreType, PageInfoType>((state) => state.pageInfo);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 添加组件到列表中
  const addComponent = (component: EditorComponentType) => {
    dispatch(storeActions.editorComponents.addComponent(component));
  };

  // 设置编辑器组件数据
  const resetEditorComponents = (state: EditorComponentsStateType) => {
    dispatch(storeActions.editorComponents.resetEditorComponents(state));
  };

  // 设置页面信息
  const setPageInfo = (state: PageInfoType) => {
    dispatch(storeActions.pageInfo.setPageInfo(state));
  };

  // 设置页面标题
  const setPageTitle = (title: string) => {
    dispatch(storeActions.pageInfo.setPageTitle(title));
  };

  // 加载编辑器组件数据
  const {
    loading,
    error,
    run: getSurveyData,
  } = useRequest(
    async () => {
      return await getQuestionServices<SurveyDetailType>(id);
    },
    {
      ready: !!id,
      manual: true,
      onSuccess: ({ id, title, desc, js, css, componentList }) => {
        let selectedId = '';
        if (componentList.length) {
          // 第一个组件默认选中
          selectedId = componentList[0].fe_id;
        }
        // 设置页面数据
        setPageInfo({ id, title, desc, js, css });
        // 设置编辑器组件数据
        resetEditorComponents({ selectedId, editorComponentList: componentList, copiedComponent });
      },
    }
  );

  // 设置选中ID
  const changeSelectedId = (id: string) => {
    // 如果已经是当前ID，那么就不要执行了。
    if (selectedId !== id) {
      dispatch(storeActions.editorComponents.changeSelectedId(id));
    }
  };

  // 被选中的组件
  const selectedComponent = editorComponentList.find((component) => component.fe_id === selectedId);

  // 清除选中的组件ID
  const clearSelectedId = () => {
    dispatch(storeActions.editorComponents.changeSelectedId(''));
  };

  // 移除选中组件
  const removeSelectedComponent = () => {
    dispatch(storeActions.editorComponents.removeSelectedComponent());
  };

  // 修改组件props属性
  const changeComponentProps = (fe_id: string, newProps: EditorComponentsPropsType) => {
    dispatch(storeActions.editorComponents.changeComponentProps({ fe_id, newProps }));
  };

  // 修改组件标题
  const changeComponentTitle = (fe_id: string, title: string) => {
    dispatch(storeActions.editorComponents.changeComponentTitle({ fe_id, title }));
  };

  // 设置组件的隐藏/显示状态
  const setComponentVisible = (fe_id: string, visible: boolean) => {
    dispatch(storeActions.editorComponents.setComponentVisible({ fe_id, visible }));
  };

  // 切换组件的锁定状态
  const toggleComponentLockStatus = (fe_id: string) => {
    dispatch(storeActions.editorComponents.toggleComponentLockStatus(fe_id));
  };

  // 复制当前选中组件
  const copySelectComponent = () => {
    dispatch(storeActions.editorComponents.copySelectComponent());
  };

  // 粘贴已经复制的组件
  const pasteCopiedComponent = () => {
    dispatch(storeActions.editorComponents.pasteCopiedComponent());
  };

  // 选中上一个组件移动
  const selectPrevComponent = () => {
    dispatch(storeActions.editorComponents.selectPrevComponent());
  };

  // 选中下一个组件
  const selectNextComponent = () => {
    dispatch(storeActions.editorComponents.selectNextComponent());
  };

  return {
    getSurveyData,
    loading,
    error,
    pageInfo,
    setPageInfo,
    setPageTitle,
    selectedId,
    selectedComponent,
    editorComponentList,
    copiedComponent,
    addComponent,
    resetEditorComponents,
    changeSelectedId,
    clearSelectedId,
    changeComponentProps,
    changeComponentTitle,
    setComponentVisible,
    removeSelectedComponent,
    toggleComponentLockStatus,
    copySelectComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
  };
};

export default useSurveyEditor;