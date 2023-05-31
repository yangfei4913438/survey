import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/main/userInfo.module.scss';

const UserInfo = () => {
  const { Link } = useProjectRoute();

  return (
    <div className={styles.container}>
      <Link to={routePath.login}>登录</Link>
    </div>
  );
};

export default UserInfo;
