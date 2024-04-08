import { PartProps } from './part';

const Total: React.FC<{ parts: PartProps[] }> = ({ parts }) => {
  const total = parts.reduce((acc, prev) => acc + prev.exercises, 0);

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  );
};

export default Total;
