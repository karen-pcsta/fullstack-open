const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ courseParts }) => {
  let getPartComponents = courseParts.map((course) => (
    <Part key={course.id} course={course.name} exercise={course.exercises} />
  ));

  return <div>{getPartComponents}</div>;
};

const Part = (partInfo) => {
  return (
    <p>
      {partInfo.course} {partInfo.exercise}
    </p>
  );
};

const Total = ({ numberExercises }) => {
  const sumOfExercises = numberExercises.reduce((total, part) => total + part.exercises, 0);
  return <h3>Total of {sumOfExercises} exercises</h3>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content courseParts={course.parts} />
      <Total numberExercises={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return <Course course={course} />;
};

export default App;
