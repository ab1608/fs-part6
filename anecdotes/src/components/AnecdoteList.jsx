import { useAnecdotes, useAnecdoteActions, useNotificationActions } from '../store.js';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { notify } = useNotificationActions();

  const handleVote = (id, content) => {
    vote(id);
    notify(`you voted '${content}'`);
  };

  const handleRemoval = (id) => {
    remove(id);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleRemoval(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
