import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { actionValues } from '@/consts/actions';

// 默认值
const initState: SurveyPagesType = {
  list: [],
  total: 0,
  page: actionValues.survey.defaultPage,
  pageSize: actionValues.survey.defaultPageSize,
};

export const questionsSlice = createSlice({
  name: 'questions', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 更新页码
    setPage: (state: SurveyPagesType, action: PayloadAction<number>) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    // 更新每页数量
    setPageSize: (state: SurveyPagesType, action: PayloadAction<number>) => {
      return {
        ...state,
        pageSize: action.payload,
      };
    },
    // 更新总数量
    setPageTotal: (state: SurveyPagesType, action: PayloadAction<number>) => {
      return {
        ...state,
        total: action.payload,
      };
    },
    // 更新列表数据
    setPageList: (state: SurveyPagesType, action: PayloadAction<questionType[]>) => {
      return {
        ...state,
        list: action.payload,
      };
    },
    // 重置
    resetQuestions: () => initState,
  },
});

// 导出 action 方法
export const questionsActions = questionsSlice.actions;

// 导出 reducer
export const questionsReducer = questionsSlice.reducer;
