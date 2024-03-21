import { useContext, createContext, useState, PropsWithChildren } from 'react';

type CatContextType = ReturnType<typeof useProvideCat>;

type CatImage = {
  height: number;
  width: number;
  url: string;
  id: string;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: PropsWithChildren) => {
  const value = useProvideCat();

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};

/**
 * This hook handles in memory caching of data from
 * the api requests.
 */
function useProvideCat() {
  const [queryCache, setQueryCache] = useState<{ [k: string]: any }>({});
  const [imageCache, setImageCache] = useState<{
    [k: string]: { images: Map<string, CatImage>; next: boolean };
  } | null>(null);

  const addImages = (breed: string, dataImages: CatImage[]) => {
    const target = imageCache ? imageCache[breed] : null;

    if (!target) {
      const images = new Map<string, CatImage>();

      dataImages.forEach((item) => {
        images.set(item.id, item);
      });

      const next = dataImages.length >= 10;

      setImageCache((value) => ({
        ...value,
        [breed]: {
          images,
          next,
        },
      }));

      return false;
    }

    const currentLength = target.images.size;

    dataImages.forEach((item) => {
      target.images.set(item.id, item);
    });

    const next = currentLength !== target.images.size;

    setImageCache((value) => ({
      ...value,
      [breed]: { images: target.images, next },
    }));
  };

  const getImages = (breed: string) => {
    const data = imageCache ? imageCache[breed] : null;

    if (!data) {
      return null;
    }

    const items: CatImage[] = [];

    data.images.forEach((item) => {
      items.push(item);
    });

    return {
      next: data.next,
      images: items,
    };
  };

  return {
    queryCache,
    setQueryCache,
    addImages,
    getImages,
  };
}

export const useCat = () => useContext(CatContext);
