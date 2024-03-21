import Chip from '@mavvy/m3-ui/Chip';

type TemperamentProps = {
  value: string;
};
const Temperament = (props: TemperamentProps) => {
  const arr = props.value.split(',');
  return (
    <div className="flex gap-1">
      {arr.map((item, index) => (
        <Chip className="cursor-auto" key={index}>
          {item}
        </Chip>
      ))}
    </div>
  );
};

export default Temperament;
