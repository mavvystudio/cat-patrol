import { useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Button from '@mavvy/m3-ui/Button';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';

import { useCat } from '../components/CatProvider';
import useQuery from '../hooks/use-query';

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
    callback: (res, fromCache) => {
      if (!fromCache) {
        cat?.addImages(breed!, res, page);
      }
    },
  });

  const fetchData = useCallback(
    (page: number, breed?: string) => {
      refetch(createParams(page, breed));
    },
    [refetch],
  );

  useEffect(() => {
    fetchData(page, breed);
  }, [page, breed, fetchData]);

  const handleClick = () => {
    setSearchParams({
      page: String(page + 1),
    });
  };

  const catImages = cat?.getImages(breed!);

  if (!catImages && loading) {
    return <LinearProgress color="primary" indeterminate />;
  }
  if (!catImages) {
    return null;
  }

  return (
    <div>
      {loading && <LinearProgress color="primary" indeterminate />}
      {catImages.images.map((item) => {
        return <p key={item.id}>{item.id}</p>;
      })}
      {catImages.next && <Button onClick={handleClick}>Load more</Button>}
    </div>
  );
};

export default Search;
