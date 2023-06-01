const Header = ({ header }) => {
  return <header>{header}</header>;
};

const Section = ({ item: { name, parts } }) => {
  const total = parts.reduce((acc, reducer) => acc + reducer.exercises, 0);

  return (
    <div>
      <h3>{name}</h3>
      <div>
        {parts.map((item) => (
          <div key={item.id}>
            {item.name} : {item.exercises}
          </div>
        ))}
      </div>
      <h4>total of {total} exercises</h4>
    </div>
  );
};

const Sections = ({ courses }) => {
  return (
    <>
      {courses.map((item) => (
        <Section item={item} key={item.id} />
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <>
      <Header header="Web development curriculum" />
      <Sections courses={courses} />
    </>
  );
};

export default App;
