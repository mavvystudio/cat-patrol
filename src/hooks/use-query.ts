import { useState, useEffect, useCallback } from 'react';
import { useCat } from '../components/CatProvider';
import { createFetch } from '../utils';

type QueryOptions = {
  params?: string;
  paused?: boolean;
  callback?: (responseData: any, fromCache: boolean) => void;
};

export default function useQuery(endpoint: string, options?: QueryOptions) {
  const queryUrl = options?.params ? `${endpoint}?${options.params}` : endpoint;
  const cat = useCat();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState(null);

  const query = useCallback(
    async (refetchParam?: string) => {
      const fetchUrl = refetchParam ? `${endpoint}?${refetchParam}` : queryUrl;
      const cacheData = cat?.queryCache[fetchUrl];
      if (cacheData) {
        setData(cacheData);
        if (options?.callback) {
          options.callback(cacheData, true);
        }
        return cacheData;
      }
      if (loading) {
        return false;
      }

      setLoading(true);

      try {
        const res = await createFetch(fetchUrl);

        /**
         * Mock error
        if (1 === 1) {
          throw new Error('foo');
        }
         */
        setLoading(false);

        setData(() => res);

        cat?.setQueryCache((value: any) => ({
          ...value,
          [fetchUrl]: res,
        }));

        if (options?.callback) {
          options.callback(res, false);
        }

        return res;
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    },
    [endpoint, cat, queryUrl, options, loading],
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
    error,
  };
}
