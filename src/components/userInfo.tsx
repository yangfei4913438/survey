import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const UserInfo = () => {
  const { Link } = useProjectRoute();

  return (
    <div className=''>
      <Link to={routePath.login} className='prose-sm text-lg text-blue-500 decoration-transparent'>
        登录
      </Link>
    </div>
  );
};

export default UserInfo;
