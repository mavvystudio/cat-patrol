import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useQuery from '../hooks/use-query';
import Select from '@mavvy/m3-ui/Select';
import { useState } from 'react';

const Root = () => {
  const { breed } = useParams();
  const { data, loading } = useQuery('/breeds');
  const [value, setValue] = useState<string | undefined>(breed);
  const navigate = useNavigate();

  if (loading || loading === null) {
    return null;
  }
  if (breed && !data.find((d: any) => d.id === breed)) {
    return <p>404</p>;
  }

  console.log(data, loading, breed);
  const options = data.map((item: { name: string; id: string }) => ({
    text: item.name,
    value: item.id,
  }));

  const handleChange = (id: string) => {
    console.log(id);
    setValue(id);
    navigate(`/search/${id}`);
  };

  return (
    <div className="p-4">
      <Select
        label="Select Breed"
        value={value}
        options={options}
        onChange={handleChange}
      />
      <Outlet />
    </div>
  );
};

export default Root;
