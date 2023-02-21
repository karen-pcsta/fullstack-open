const Header = (title) => {
  return <h1>{title.course}</h1>;
};

const Content = (courseParts) => {
  return (
    <div>
      <Part course={courseParts.part[0].name} exercise={courseParts.part[0].exercises} />
      <Part course={courseParts.part[1].name} exercise={courseParts.part[1].exercises} />
      <Part course={courseParts.part[2].name} exercise={courseParts.part[2].exercises} />
    </div>
  );
};

const Part = (partInfo) => {
  return (
    <p>
      {partInfo.course} {partInfo.exercise}
    </p>
  );
};

const Total = (numberExercises) => {
  console.log(numberExercises);
  return (
    <p>
      Number of exercises{" "}
      {numberExercises.exerciseCount[0].exercises +
        numberExercises.exerciseCount[1].exercises +
        numberExercises.exerciseCount[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total exerciseCount={course.parts} />
    </div>
  );
};

export default App;
