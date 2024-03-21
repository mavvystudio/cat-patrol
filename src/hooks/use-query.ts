import { useState, useEffect, useCallback } from 'react';
import { useCat } from '../components/CatProvider';
import { createFetch } from '../utils';

type QueryOptions = {
  params?: string;
  paused?: boolean;
  callback?: (responseData: any) => void;
};

export default function useQuery(endpoint: string, options?: QueryOptions) {
  const queryUrl = options?.params ? `${endpoint}?${options.params}` : endpoint;
  const cat = useCat();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const query = useCallback(
    async (refetchParam?: string) => {
      const fetchUrl = refetchParam ? `${endpoint}?${refetchParam}` : queryUrl;
      const cacheData = cat?.queryCache[fetchUrl];
      console.log({ cacheData, fetchUrl });
      if (cacheData) {
        setData(cacheData);
        if (options?.callback) {
          options.callback(cacheData);
        }
        return cacheData;
      }

      setLoading(true);

      const res = await createFetch(fetchUrl);

      setLoading(false);

      setData(() => res);

      cat?.setQueryCache((value: any) => ({
        ...value,
        [fetchUrl]: res,
      }));

      if (options?.callback) {
        options.callback(res);
      }

      return res;
    },
    [endpoint, cat, queryUrl, options],
  );

  useEffect(() => {
    if (!options?.paused) {
      query();
    }
  }, [query, options?.paused]);

  return {
    loading,
    data,
    refetch: query,
  };
}
