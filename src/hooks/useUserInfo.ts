import { useRequest } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import { cacheKeys } from '@/consts/cache';
import localCache from '@/core/cache';
import { getUserInfoServices } from '@/services/user';
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

  // 当用户数据不存在的时候，自动发起用户数据的请求
  const { loading } = useRequest(
    async () => {
      return await getUserInfoServices<LocalUserType>();
    },
    {
      // 内存中不存在的时候，而且存在token的时候。才会主动发起请求。（一般会在页面刷新的时候发起请求）
      ready: !userInfo.username && !!localCache.getItem(cacheKeys.token),
      onSuccess: (data) => {
        // 更新内存数据
        setUserInfo(data);
      },
    }
  );

  // 返回
  return {
    loading,
    userInfo,
    setUserInfo,
    resetUserInfo,
  };
};

export default useUserInfo;
