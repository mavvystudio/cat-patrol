import { useContext, createContext, useState, PropsWithChildren } from 'react';

type CatContextType = ReturnType<typeof useProvideCat>;

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: PropsWithChildren) => {
  const value = useProvideCat();
  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};

function useProvideCat() {
  const [queryCache, setQueryCache] = useState<{ [k: string]: any }>({});

  return {
    queryCache,
    setQueryCache,
  };
}

export const useCat = () => useContext(CatContext);
