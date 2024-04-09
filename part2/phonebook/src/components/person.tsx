export type PersonProps = {
  id: number;
  name: string;
  number: string;
};

interface IPerson {
  id: number;
  name: string;
  number: string;
  handleDelete: (id: number) => void;
}

const Person: React.FC<IPerson> = ({ handleDelete, id, name, number }) => {
  return (
    <li>
      {name} {number}
      <button onClick={() => handleDelete(id)}>delete</button>
    </li>
  );
};

export default Person;
