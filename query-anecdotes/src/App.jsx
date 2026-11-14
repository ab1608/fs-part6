import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useAnecdotes } from './hooks/useAnecdotes.js';

const App = () => {
  const { anecdotes, isPending, isError, incrementVote } = useAnecdotes();

  const handleVote = (anecdote) => {
    incrementVote(anecdote);
  };

  if (isPending) {
    return <div>loading data...</div>;
  } else if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  } else {
    return (
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default App;
