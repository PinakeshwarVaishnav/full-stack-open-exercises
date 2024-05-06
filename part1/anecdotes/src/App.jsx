import { useState } from 'react'

const Vote = ({ index, voteForItem}) => <button onClick={() => voteForItem(index)}>vote</button>

const Button = ({onClick}) => <button onClick={onClick}>next anecdote</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const newRandomNumber = Math.floor(Math.random() * (anecdotes.length))
  const setRandomNumber = () => {
    let newRandomNumber;
    do {
      newRandomNumber = Math.floor(Math.random() * anecdotes.length);
    } while (newRandomNumber === selected);
    setSelected(newRandomNumber);
  };
  

  const voteForItem = (index) => {
    setVotes(prevVotes => {
      const newVotes = [...prevVotes]
      newVotes[index]++
      return newVotes
    })
  }
  const indexOfMaxVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
      <Vote index={selected} voteForItem={voteForItem}/>
      <Button onClick={setRandomNumber} />
      </div>
      <h1>Anecode with most votes</h1>
      {anecdotes[indexOfMaxVotes]}
      <div>has {votes[indexOfMaxVotes]} votes</div>
    </div>
  )
}

export default App