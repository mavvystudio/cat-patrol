import { Outlet, useLocation } from 'react-router-dom';
import Button from '@mavvy/m3-ui/Button';
import TopAppBar from '@mavvy/m3-ui/TopAppBar';
import Text from '@mavvy/m3-ui/Text';

import BreedSelect from '../components/BreedSelect';

const Root = () => {
  const location = useLocation();
  const isDetailView = location.pathname.indexOf('/breed') === 0;
  return (
    <div>
      {!isDetailView && (
        <TopAppBar className="!h-24 justify-between sticky top-0 z-10">
          <Text variant="headline">Cat Patrol</Text>
          <BreedSelect />
          <a
            href="https://github.com/mavvystudio/cat-patrol"
            target="_blank"
            rel="noreferrer"
          >
            <Button icon="code">Github</Button>
          </a>
        </TopAppBar>
      )}
      <Outlet />
    </div>
  );
};

export default Root;
