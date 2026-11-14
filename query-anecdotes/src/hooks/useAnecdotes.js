import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAll, createNewAnecdote, incrementVote } from '../services/anecdotes.js';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    rety: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  const updateAnecdoteVote = useMutation({
    mutationFn: incrementVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
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
