import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAll, createNewAnecdote, incrementVote } from '../services/anecdotes.js';
import { useNotification } from './useNotification.js';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      setNotification(`created ${newAnecdote.content}`);
      setTimeout(() => setNotification(null), 5000);
    },
    onError: () => {
      setNotification('too short anecdote, must have length 5 or more');
      setTimeout(() => setNotification(null), 5000);
    },
  });

  const updateAnecdoteVote = useMutation({
    mutationFn: incrementVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      setNotification(`anecdote ${updatedAnecdote.content} voted`);
      setTimeout(() => setNotification(null), 5000);
    },
    throwOnError: true,
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    incrementVote: (currentAnecdote) =>
      updateAnecdoteVote.mutate({ ...currentAnecdote, votes: currentAnecdote.votes + 1 }),
  };
};
