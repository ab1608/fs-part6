import { useAnecdotes } from '../hooks/useAnecdotes.js';

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();

  const addAnecdotes = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdote(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdotes}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
