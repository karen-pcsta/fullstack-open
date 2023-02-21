const Header = (title) => {
  return <h1>{title.course}</h1>;
};

const Content = (courseParts) => {
  console.log(courseParts);
  return (
    <div>
      <Part course={courseParts.part[0]} exercise={courseParts.exercise[0]} />
      <Part course={courseParts.part[1]} exercise={courseParts.exercise[1]} />
      <Part course={courseParts.part[2]} exercise={courseParts.exercise[2]} />
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

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} exercise={[exercises1, exercises2, exercises3]} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  );
};

export default App;
