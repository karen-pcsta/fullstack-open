import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Votes = ({ votes }) => {
  return <p>has {votes} votes</p>;
};

const Heading = ({ text }) => {
  return <h2> {text} </h2>;
};

let hasVote = false;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  function handleRandomAnecdote() {
    const randomValue = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomValue);
  }

  function handleVotes() {
    const votesCopyArr = [...votes];
    votesCopyArr[selected] += 1;
    if (!hasVote) {
      hasVote = true;
    }
    // console.log(votesCopyArr);
    setVotes(votesCopyArr);
  }

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));

  const mostVotes = Math.max(...votes);
  const indexOfMostVoted = votes.indexOf(mostVotes);
  // console.log(hasVote);
  return (
    <>
      <Heading text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Votes votes={votes[selected]} />
      <Button handleClick={handleVotes} text="Vote" />
      <Button handleClick={handleRandomAnecdote} text="Next Anecdote" />
      <Heading text="Anecdote with most votes" />
      {hasVote && (
        <div>
          <p>{anecdotes[indexOfMostVoted]}</p>
          <p>Has {votes[indexOfMostVoted]} votes</p>
        </div>
      )}
    </>
  );
};

export default App;
