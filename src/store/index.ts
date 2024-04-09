import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

import {
  editorComponentsReducer,
  pageInfoReducer,
  questionsReducer,
  userInfoReducer,
} from '@/store/slices';

// 封装 redux-undo 能力
const editorComponents = undoable(editorComponentsReducer, {
  limit: 20, // 限制保留 20 条操作记录
  filter: excludeAction([
    'editorComponents/resetEditorComponents', // 重置的一般初始化才会操作，不需要撤销重做
    'editorComponents/selectPrevComponent', // 选中上一个组件操作，不需要撤销重做
    'editorComponents/selectNextComponent', // 选中下一个组件操作，不需要撤销重做
    'editorComponents/changeSelectedId', // 改变选中组件操作，不需要撤销重做
    'editorComponents/setLoadingStatus', // 设置数据的加载状态，不需要撤销重做
  ]),
  syncFilter: true, // 用于解决撤销会清空初始数据的问题，具体有啥用还不清楚
  // ignoreInitialState: true, // 这个看起来应该生效，但实际没生效。先留着，说不定哪天更新就有用了。。。
});

// 导出的 redux store 类型
export interface ReduxStoreType {
  userInfo: LocalUserType;
  editorComponents: StateWithHistory<EditorComponentsStateType>;
  pageInfo: PageInfoType;
  questions: SurveyPagesType;
}

export default configureStore({
  // 不同的命名空间，对应的reducer
  reducer: {
    // 用户信息
    userInfo: userInfoReducer,
    // 编辑器组件信息
    editorComponents,
    // 编辑器页面信息
    pageInfo: pageInfoReducer,
    // 问卷列表
    questions: questionsReducer,
  },
});
