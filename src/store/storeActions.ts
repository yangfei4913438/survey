import { pageInfoActions } from '@/store/pageInfo';

import { editorComponentActions } from './editorComponents';
import { userInfoActions } from './userInfo';

export default {
  userInfo: {
    ...userInfoActions,
  },
  editorComponents: {
    ...editorComponentActions,
  },
  pageInfo: {
    ...pageInfoActions,
  },
};
