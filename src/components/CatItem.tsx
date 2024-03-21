import Button from '@mavvy/m3-ui/Button';
import { Link } from 'react-router-dom';

type CatItemProps = {
  item: {
    url: string;
    id: string;
  };
};

const CatItem = (props: CatItemProps) => {
  return (
    <div className="items-stretch justify-between flex flex-col h-80 rounded-2xl bg-surface-container-high overflow-hidden">
      <img
        src={props.item.url}
        alt="a cat"
        className="h-[280px] object-cover w-full"
      />
      <Link to={`/breed/${props.item.id}`}>
        <Button
          className="mb-[6px] w-full"
          size="small"
          variant="text"
          color="primary"
        >
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default CatItem;
