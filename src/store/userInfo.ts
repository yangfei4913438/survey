import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initState: LocalUserType = { username: '', nickname: '' };

export const userInfoSlice = createSlice({
  name: 'userInfo', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 这里的state类型，必须显示的声明
    setUserInfo: (state: LocalUserType, action: PayloadAction<LocalUserType>) => {
      return action.payload;
    },
    // 登出就是重置
    resetUserInfo: () => initState,
  },
});

// 导出 action 方法
export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;

// 导出reducer
export default userInfoSlice.reducer;
