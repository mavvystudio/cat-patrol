import { useParams } from 'react-router-dom';

const Breed = () => {
  const params = useParams();
  console.log(params);
  return <p>Breed</p>;
};

export default Breed;
