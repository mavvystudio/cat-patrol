import { useContext, createContext, useState, PropsWithChildren } from 'react';

type CatContextType = {
  data: any;
  setData: (data: any) => void;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<any>({});
  return (
    <CatContext.Provider value={{ data, setData }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => useContext(CatContext);
