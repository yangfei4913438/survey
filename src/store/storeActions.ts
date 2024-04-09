import {
  editorComponentActions,
  pageInfoActions,
  questionsActions,
  userInfoActions,
} from '@/store/slices';

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
  questions: {
    ...questionsActions,
  },
};
