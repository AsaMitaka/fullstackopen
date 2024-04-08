type Part = { name: string; exercises: number };

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

const Content: React.FC<{ parts: Part[] }> = ({ parts }) => {
  return (
    <ul>
      {parts.map((part: Part) => (
        <Part part={part} />
      ))}
    </ul>
  );
};

const Part: React.FC<{ part: Part }> = ({ part }) => (
  <li>
    Name: {part.name}, exercises: {part.exercises}
  </li>
);

const Total: React.FC<{ parts: Part[] }> = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return <p>Total number of exercises: {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  );
};

export default App;
