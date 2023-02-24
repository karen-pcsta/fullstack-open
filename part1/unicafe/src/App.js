import { useState } from "react";

const FeedbackHeader = (title) => {
  return <h2>Give feedback</h2>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsHeader = (title) => {
  return <h2>Statistics</h2>;
};

const CollectedFeedback = ({ feedback, text }) => {
  return (
    <p>
      {text}: {feedback}
    </p>
  );
};

const Statistics = (value) => {
  const total = value.value.reduce((sum, a) => sum + a);
  const average = ((value.value[0] + value.value[2]) / total).toFixed(5);
  const positive = (value.value[0] / total).toFixed(5);
  return (
    <>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGoodClick() {
    setGood(good + 1);
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
  }

  function handleBadClick() {
    setBad(bad + 1);
  }

  return (
    <div>
      <FeedbackHeader />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <StatisticsHeader />
      <CollectedFeedback feedback={good} text="Good" />
      <CollectedFeedback feedback={neutral} text="Neutral" />
      <CollectedFeedback feedback={bad} text="Bad" />
      <Statistics value={[good, neutral, bad]} />
    </div>
  );
};

export default App;
