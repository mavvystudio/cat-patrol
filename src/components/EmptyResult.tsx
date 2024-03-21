import Text from '@mavvy/m3-ui/Text';
import { Link } from 'react-router-dom';

type EmptyResultProps = {
  message?: string;
};

const EmptyResult = (props: EmptyResultProps) => {
  const message = props.message || 'No results found.';
  return (
    <div className="my-8 flex flex-col items-center gap-y-4 justify-center">
      <Text>{message}</Text>
      <Link to="/">
        <Text color="primary">back to the home page</Text>
      </Link>
    </div>
  );
};

export default EmptyResult;
