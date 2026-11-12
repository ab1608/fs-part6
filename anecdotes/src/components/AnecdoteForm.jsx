import { useAnecdoteActions, useNotificationActions } from '../store.js';

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { notify } = useNotificationActions();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target['anecdote'].value;
    await add(content);
    notify(`Created new anecdote "${content}"`);
    e.target.reset();
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
          <button>create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
