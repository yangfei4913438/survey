import { useRequest } from 'ahooks';

import { cacheKeys } from '@/consts/cache';
import localCache from '@/core/cache';
import useUserInfo from '@/hooks/store/useUserInfo';
import { getUserInfoServices } from '@/services/user';

const useLoadingUserInfo = () => {
  const { userInfo, setUserInfo } = useUserInfo();

  // 当用户数据不存在的时候，自动发起用户数据的请求
  const { loading: loadUserInfoLoading, run: loadUserInfo } = useRequest(
    async () => {
      return await getUserInfoServices<LocalUserType>();
    },
    {
      manual: true,
      // 内存中不存在的时候，而且存在token的时候。才会主动发起请求。（一般会在页面刷新的时候发起请求）
      ready: !userInfo.username && !!localCache.getItem(cacheKeys.token),
      onSuccess: (data) => {
        // 更新内存数据
        setUserInfo(data);
      },
    }
  );

  return {
    loadUserInfo,
    loadUserInfoLoading,
  };
};

export default useLoadingUserInfo;
