import { Content, Header, Total } from '.';
import { PartProps } from './part';

interface Course {
  id: number;
  name: string;
  parts: PartProps[];
}

interface Courses {
  courses: Course[];
}

const Courses: React.FC<Courses> = ({ courses }) => {
  return (
    <>
      {courses.map((course: Course) => (
        <div key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Courses;
