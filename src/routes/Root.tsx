import { Outlet } from 'react-router-dom';
import useQuery from '../hooks/use-query';

const Root = () => {
  const { data, loading } = useQuery('/breeds');

  if (loading) {
    return null;
  }

  console.log(data, loading);

  return (
    <div className="p-4">
      <p>Text</p>
      <Outlet />
    </div>
  );
};

export default Root;
