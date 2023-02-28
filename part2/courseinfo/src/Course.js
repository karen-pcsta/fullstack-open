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

export default Course;
