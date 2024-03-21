import { useState } from 'react';
import useQuery from '../hooks/use-query';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { breed } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(
    `/images/search?page=${page}&limit=10&breed_id=${breed}`,
  );
  return <div></div>;
};

export default Search;
