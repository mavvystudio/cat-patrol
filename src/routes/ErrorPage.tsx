import Button from '@mavvy/m3-ui/Button';
import Text from '@mavvy/m3-ui/Text';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-y-4 items-center p-4">
      <Text variant="display">Oops!</Text>
      <Text variant="headline">404 Not Found</Text>
      <Button
        onClick={handleClick}
        variant="filled"
        color="tertiary"
        size="large"
      >
        Back to Home Page
      </Button>
    </div>
  );
};

export default ErrorPage;
