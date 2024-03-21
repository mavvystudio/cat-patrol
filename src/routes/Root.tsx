import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Select from '@mavvy/m3-ui/Select';
import TopAppBar from '@mavvy/m3-ui/TopAppBar';

import useQuery from '../hooks/use-query';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';

const Root = () => {
  const { breed } = useParams();
  const { data, loading } = useQuery('/breeds');
  const [value, setValue] = useState<string | undefined>(breed);
  const navigate = useNavigate();

  if (loading || loading === null) {
    return <LinearProgress color="primary" indeterminate />;
  }

  if (breed && !(data || []).find((d: any) => d.id === breed)) {
    return <p>404</p>;
  }

  const options = (data || []).map((item: { name: string; id: string }) => ({
    text: item.name,
    value: item.id,
  }));

  const handleChange = (id: string) => {
    setValue(id);
    if (!id) {
      return navigate('/');
    }
    return navigate(`/search/${id}?page=1`);
  };

  return (
    <div>
      <TopAppBar className="!h-24 justify-center sticky top-0">
        <Select
          className="!w-[400px]"
          variant="filled"
          label="Select Breed"
          value={value}
          options={options}
          onChange={handleChange}
        />
      </TopAppBar>
      <Outlet />
    </div>
  );
};

export default Root;
