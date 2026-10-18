import { useAnecdotes, useAnecdoteActions } from "./store";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";

const App = () => {
  const anecdotes = useAnecdotes();
  const { vote, add } = useAnecdoteActions();

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
