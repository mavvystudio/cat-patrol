import useQuery from '../hooks/use-query';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from '@mavvy/m3-ui/Button';
import { useCat } from '../components/CatProvider';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';
import { useEffect } from 'react';

const endpoint = '/images/search';
const createParams = (page: number, breed?: string) =>
  `page=${page}&limit=10&breed_id=${breed}`;

const Search = () => {
  const { breed } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const cat = useCat();
  const { loading, refetch } = useQuery(endpoint, {
    params: createParams(1, breed),
    paused: true,
    callback: (res) => {
      cat?.addImages(breed!, res);
    },
  });

  useEffect(() => {
    refetch(createParams(page, breed));
  }, [page, breed]);

  if (loading || loading === null) {
    return <LinearProgress color="primary" indeterminate />;
  }
  const images = cat?.getImages(breed!);

  const handleClick = () => {
    setSearchParams({
      page: String(page + 1),
    });
  };

  if (!images) {
    return null;
  }

  return (
    <div>
      {images.images.map((item) => {
        return <p key={item.id}>{item.id}</p>;
      })}
      {images.next && <Button onClick={handleClick}>Load more</Button>}
    </div>
  );
};

export default Search;
