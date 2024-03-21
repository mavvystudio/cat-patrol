import { useEffect, useState } from 'react';
import useQuery from '../hooks/use-query';
import { useParams } from 'react-router-dom';
import Button from '@mavvy/m3-ui/Button';
import { useCat } from '../components/CatProvider';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';

const endpoint = '/images/search';
const createParams = (page: number, breed?: string) =>
  `page=${page}&limit=10&breed_id=${breed}`;

const Search = () => {
  const { breed } = useParams();
  const [page, setPage] = useState(1);
  const cat = useCat();
  const { loading, refetch } = useQuery(endpoint, {
    params: createParams(page, breed),
    paused: true,
  });
  useEffect(() => {
    setPage(() => 1);
    refetch(createParams(1, breed));
  }, [breed]);

  useEffect(() => {
    if (page > 1) {
      refetch(createParams(page, breed));
    }
  }, [page]);

  useEffect(() => {
    const url = `${endpoint}?${createParams(page, breed)}`;
    const targetData = cat?.queryCache[url];
    if (targetData && loading === false) {
      cat?.addImages(breed!, targetData);
    }
  }, [cat?.queryCache, breed, loading, page]);

  if (loading || loading === null) {
    return <LinearProgress color="primary" indeterminate />;
  }
  const images = cat?.getImages(breed!);

  const handleClick = () => {
    setPage((value) => value + 1);
    refetch();
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
