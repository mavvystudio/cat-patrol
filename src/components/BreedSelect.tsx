import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Select from '@mavvy/m3-ui/Select';
import CircularProgress from '@mavvy/m3-ui/CircularProgress';
import Dialog from '@mavvy/m3-ui/Dialog';
import Text from '@mavvy/m3-ui/Text';

import useQuery from '../hooks/use-query';
import { useCat } from '../components/CatProvider';

const BreedSelect = () => {
  const { breed } = useParams();
  const navigate = useNavigate();
  const cat = useCat();
  const { data, loading } = useQuery('/breeds');
  const [value, setValue] = useState<string | undefined>(breed);

  if (loading) {
    return <CircularProgress color="tertiary" indeterminate />;
  }

  if (breed && !(data || []).find((d: any) => d.id === breed)) {
    return (
      <Dialog open={true} onClose={() => {}} disableBackdropClose>
        <div className="flex flex-col p-4 gap-y-2">
          <Text variant="title">Something went wrong.</Text>
          <Text>Please try to refresh the page.</Text>
        </div>
      </Dialog>
    );
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

    const catImages = cat?.getImages(id);
    if (catImages) {
      const page = catImages.page;
      return navigate(`/search/${id}?page=${page}`);
    }
    return navigate(`/search/${id}?page=1`);
  };

  return (
    <Select
      className="!w-[400px]"
      variant="filled"
      label="Select Breed"
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
};

export default BreedSelect;
