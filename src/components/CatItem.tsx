type CatItemProps = {
  item: {
    url: string;
    id: string;
  };
};

const CatItem = (props: CatItemProps) => {
  return (
    <img
      src={props.item.url}
      alt="a cat"
      className="object-cover h-60 w-full rounded-2xl cursor-pointer"
    />
  );
};

export default CatItem;
