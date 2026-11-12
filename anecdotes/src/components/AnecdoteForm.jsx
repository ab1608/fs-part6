import { useAnecdoteActions } from '../store.js';

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target['newanec'].value;
    add({ content });
    e.target.reset();
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newanec" />
          <button>create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
