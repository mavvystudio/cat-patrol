import { useState, useEffect, useCallback } from 'react';
import { useCat } from '../components/CatProvider';
import { createFetch } from '../utils';

export default function useQuery(endpoint: string, params?: string) {
  const queryUrl = params ? `${endpoint}?${params}` : endpoint;
  const cat = useCat();
  const [loading, setLoading] = useState<boolean | null>(null);

  const query = useCallback(async () => {
    const cacheData = cat?.queryCache[queryUrl];

    if (cacheData || loading) {
      return null;
    }

    setLoading(true);

    const res = await createFetch(queryUrl);

    setLoading(false);

    cat?.setQueryCache((value: any) => ({
      ...value,
      [queryUrl]: res,
    }));
  }, [cat, loading, queryUrl]);

  useEffect(() => {
    query();
  }, [query]);

  return {
    loading,
    data: cat?.queryCache[queryUrl],
  };
}
