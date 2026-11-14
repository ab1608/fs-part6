import { useAnecdotes } from '../hooks/useAnecdotes.js';
import { useNotification } from '../hooks/useNotification.js';

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();

  const { setNotification } = useNotification();

  const addAnecdotes = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    try {
      addAnecdote(content);
    } catch {
      setNotification('too short anecdote, must have length 5 or more');
      setTimeout(() => setNotification(null), 5000);
    }
    setNotification(`created ${content}`);
    setTimeout(() => setNotification(null), 5000);
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
