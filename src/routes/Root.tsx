import { Outlet, useLocation } from 'react-router-dom';
import TopAppBar from '@mavvy/m3-ui/TopAppBar';

import BreedSelect from '../components/BreedSelect';

const Root = () => {
  const location = useLocation();
  const isDetailView = location.pathname.indexOf('/breed') === 0;
  return (
    <div>
      {!isDetailView && (
        <TopAppBar className="!h-24 justify-center sticky top-0">
          <BreedSelect />
        </TopAppBar>
      )}
      <Outlet />
    </div>
  );
};

export default Root;
