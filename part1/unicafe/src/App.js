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

const Statistics = ({ value, text }) => {
  const total = value.reduce((sum, a) => sum + a);
  const average = ((value[0] + value[2]) / total).toFixed(5);
  const positive = (value[0] / total).toFixed(5);
  if (total) {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={value[0]} text={text[0]} />{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={value[1]} text={text[1]} />{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={value[2]} text={text[2]} />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={total} text={"All"} />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={average} text={"Average"} />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <StatisticsLine value={`${positive} %`} text={"Positive"} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

const StatisticsLine = ({ value, text }) => {
  return (
    <p>
      {text} : {value}
    </p>
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
      <Statistics value={[good, neutral, bad]} text={["Good", "Neutral", "Bad"]} />
    </div>
  );
};

export default App;
