import { changeSelectedId, resetEditorComponents } from './editorComponents';
import { resetUserInfo, setUserInfo } from './userInfo';

export default {
  userInfo: {
    setUserInfo,
    resetUserInfo,
  },
  editorComponents: {
    resetEditorComponents,
    changeSelectedId,
  },
};
