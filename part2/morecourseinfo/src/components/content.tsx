import Part, { PartProps } from './part';

const Content: React.FC<{ parts: PartProps[] }> = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

export default Content;
