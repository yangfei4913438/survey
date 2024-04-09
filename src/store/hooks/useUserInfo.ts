import { useDispatch, useSelector } from 'react-redux';

import { ReduxStoreType } from '@/store';
import storeActions from '@/store/storeActions';

// 用户信息相关的数据处理
const useUserInfo = () => {
  // 取出redux中的数据，第一个泛型是整个store的导出类型，第二个是目标命名空间的类型
  const userInfo = useSelector<ReduxStoreType, LocalUserType>((state) => state.userInfo);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置新的用户数据
  const setUserInfo = (userInfo: LocalUserType) => {
    dispatch(storeActions.userInfo.setUserInfo(userInfo));
  };

  // 重置用户数据为默认值
  const resetUserInfo = () => {
    dispatch(storeActions.userInfo.resetUserInfo());
  };

  // 返回
  return {
    userInfo,
    setUserInfo,
    resetUserInfo,
  };
};

export default useUserInfo;
