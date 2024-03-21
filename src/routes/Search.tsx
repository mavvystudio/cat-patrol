import { useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Button from '@mavvy/m3-ui/Button';
import LinearProgress from '@mavvy/m3-ui/LinearProgress';

import { useCat } from '../components/CatProvider';
import useQuery from '../hooks/use-query';
import CatItem from 'components/CatItem';

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
    <div className="flex flex-col items-center mb-10">
      {loading && (
        <div className="sticky top-[96px] w-full">
          <LinearProgress color="primary" indeterminate />
        </div>
      )}
      <div className="flex flex-col md:grid grid-cols-4 container gap-2.5 my-4 p-4 md:p-0">
        {catImages.images.map((item) => {
          return <CatItem key={item.id} item={item} />;
        })}
      </div>
      {catImages.next && (
        <Button
          color="secondary"
          variant="filled"
          disabled={Boolean(loading)}
          onClick={handleClick}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default Search;
