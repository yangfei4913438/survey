import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initState: PageInfoType = {
  id: '',
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: undefined,
};

export const pageInfoSlice = createSlice({
  name: 'pageInfo', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 这里的state类型，必须显示的声明
    setPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 修改标题
    setPageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    // 重置数据
    resetPageInfo: () => initState,
  },
});

// 导出 action 方法
export const pageInfoActions = pageInfoSlice.actions;

// 导出 reducer
export const pageInfoReducer = pageInfoSlice.reducer;
