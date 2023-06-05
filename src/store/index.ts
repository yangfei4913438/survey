import { configureStore } from '@reduxjs/toolkit';

import userInfoReducer from '@/store/userInfo';

// 修改时，请一起修改类型定义文件 src/types/reduxStore.d.ts
export default configureStore({
  reducer: {
    userInfo: userInfoReducer, // 不同的命名空间，对应的reducer
  },
});
