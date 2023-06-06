import { configureStore } from '@reduxjs/toolkit';

import { editorComponentsReducer } from '@/store/editorComponents';
import { userInfoReducer } from '@/store/userInfo';

export default configureStore({
  // 不同的命名空间，对应的reducer
  reducer: {
    userInfo: userInfoReducer, // 用户信息
    editorComponents: editorComponentsReducer, // 编辑器组件信息
  },
});
