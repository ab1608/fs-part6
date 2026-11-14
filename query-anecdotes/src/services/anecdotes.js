const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes');
  }

  return await response.json();
};

export const createNewAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error('too short');
  }

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body?.error || 'Failed to create anecdote');
  }

  return await res.json();
};

export const incrementVote = async (anecdote) => {
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

export const remove = async (anecdote) => {
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete: ${res.status}`);
  }
};
