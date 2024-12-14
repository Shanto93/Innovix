import useAuth from './../../hooks/useAuth';

const Overview = () => {
  const {user} = useAuth();
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <h2>{user?.email}</h2>
    </div>
  );
};

export default Overview;
