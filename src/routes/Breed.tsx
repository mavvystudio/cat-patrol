import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mavvy/m3-ui/Card';
import useQuery from 'hooks/use-query';
import Button from '@mavvy/m3-ui/Button';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';
import Text from '@mavvy/m3-ui/Text';
import Temperament from 'components/Temperament';
import EmptyResult from 'components/EmptyResult';
import { useEffect } from 'react';

const Breed = () => {
  const params = useParams();
  const {
    data,
    loading,
    error,
    refetch,
  }: {
    refetch: () => any;
    data: any;
    loading: boolean | null;
    error: null | string;
  } = useQuery(`/images/${params.id}`, {
    paused: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-y-4 items-center">
        <LinearProgress color="primary" indeterminate />
        <div className="container">
          <Card className="h-[300px]" />
        </div>
      </div>
    );
  }
  if (!data || error) {
    return <EmptyResult />;
  }

  const breed = data.breeds[0];

  const handleBack = () => {
    navigate(`/search/${breed.id}?page=1&limit=10`);
  };

  console.log(data);

  return (
    <div className="flex justify-center p-4 md:p-0">
      <div className="flex flex-col container my-4">
        <Button
          className="self-start"
          variant="filled"
          color="tertiary"
          onClick={handleBack}
        >
          Back
        </Button>
        <Card className="animate-fade-in-top flex flex-col my-4 md:grid grid-cols-2 gap-4">
          <img className="rounded-2xl" src={data.url} alt={breed.name} />
          <div className="flex flex-col gap-y-4">
            <Text variant="display">{breed.name}</Text>
            <Text variant="headline">Origin: {breed.origin}</Text>
            <Temperament value={breed.temperament} />
            <Text>{breed.description}</Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Breed;
