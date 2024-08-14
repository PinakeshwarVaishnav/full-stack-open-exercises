const Header = ({ name }) => {
  console.log(name);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  console.log(part);
  return (
    <div>
      <p>
        {part.name} {part.exercises}{" "}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      <h3>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </h3>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
