const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes');
  }

  return await response.json();
};

const createNewAnecdote = async (newAnecdote) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  });

  if (!res.ok) {
    throw new Error('Failed to create anecdote');
  }

  return await res.json();
};

const incrementVote = async (anecdote) => {
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  });

  if (!res.ok) {
    throw new Error('Failed to update anecdote');
  }

  return await res.json();
};

const remove = async (anecdote) => {
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete: ${res.status}`);
  }
};

export default { getAll, createNewAnecdote, incrementVote, remove };
