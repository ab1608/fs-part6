import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes.js';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  const updateAnecdoteVote = useMutation({
    mutationFn: anecdoteService.incrementVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
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
