import { useState, useEffect, useCallback } from 'react';
import { useCat } from '../components/CatProvider';

const baseUrl = 'https://api.thecatapi.com/v1';

export default function useQuery(endpoint: string, params?: string) {
  const queryUrl = createQueryUrl(endpoint, params);
  const cat = useCat();
  const [loading, setLoading] = useState<boolean | null>(null);

  const query = useCallback(async () => {
    const cacheData = cat?.data[queryUrl];

    if (cacheData) {
      return null;
    }

    if (loading) {
      return null;
    }

    setLoading(true);

    const res = await createFetch(queryUrl);

    setLoading(false);

    cat?.setData((value: any) => ({
      ...value,
      [queryUrl]: res,
    }));
  }, [cat, loading, queryUrl]);

  useEffect(() => {
    query();
  }, [query]);

  return {
    loading,
    data: cat?.data[queryUrl],
  };
}

function createQueryUrl(endpoint: string, params?: string) {
  if (params) {
    return `${endpoint}?${params}`;
  }

  return endpoint;
}

async function createFetch(requestUrl: string) {
  console.log('fetching');
  const res = await fetch(`${baseUrl}${requestUrl}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();

  return json;
}
