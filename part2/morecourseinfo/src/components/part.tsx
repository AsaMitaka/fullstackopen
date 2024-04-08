export interface PartProps {
  id?: number;
  name: string;
  exercises: number;
}

const Part: React.FC<PartProps> = ({ name, exercises }) => (
  <div>
    {name} {exercises}
  </div>
);

export default Part;
