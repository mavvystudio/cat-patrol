import { useState, useEffect, useCallback } from 'react';
import { useCat } from '../components/CatProvider';
import { createFetch } from '../utils';

type QueryOptions = {
  params?: string;
  paused: boolean;
};

export default function useQuery(endpoint: string, options?: QueryOptions) {
  const queryUrl = options?.params ? `${endpoint}?${options.params}` : endpoint;
  const cat = useCat();
  const [loading, setLoading] = useState<boolean | null>(null);

  const query = useCallback(
    async (refetchParam?: string) => {
      const cacheData = cat?.queryCache[queryUrl];

      if (cacheData || loading) {
        return null;
      }

      setLoading(true);

      const fetchUrl = refetchParam ? `${endpoint}?${refetchParam}` : queryUrl;
      const res = await createFetch(fetchUrl);

      setLoading(false);

      cat?.setQueryCache((value: any) => ({
        ...value,
        [fetchUrl]: res,
      }));
    },
    [endpoint, cat, loading, queryUrl],
  );

  useEffect(() => {
    if (!options?.paused) {
      query();
    }
  }, [query, options?.paused]);

  return {
    loading,
    data: cat?.queryCache[queryUrl],
    cache: cat?.queryCache,
    refetch: query,
  };
}
