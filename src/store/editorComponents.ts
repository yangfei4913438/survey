import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: EditorComponentsStateType = {
  editorComponentList: [],
  selectedId: '',
};

export const editorComponentsSlice = createSlice({
  name: 'editorComponents', // 模块名称
  initialState: initialState, // 初始值
  reducers: {
    // 重置编辑器组件，就是把里面的组件都重置了
    // produce 是不再需要返回，直接修改即可。
    resetEditorComponents: (
      state: EditorComponentsStateType,
      action: PayloadAction<EditorComponentsStateType>
    ) => {
      return action.payload;
    },
    // 修改选中ID
    changeSelectedId: (state: EditorComponentsStateType, action: PayloadAction<string>) => {
      console.log('payload:', action.payload);
      return {
        ...state,
        selectedId: action.payload,
      };
    },
  },
});

// 导出 action 方法
export const { resetEditorComponents, changeSelectedId } = editorComponentsSlice.actions;

// 导出reducer
export default editorComponentsSlice.reducer;
