import { create } from 'zustand';
import anecdoteService from './services/anecdotes.js';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: null,
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes
          .map((a) => (a.id === id ? updatedAnecdote : a))
          .toSorted((a, b) => b.votes - a.votes),
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },
    remove: async (id) => {
      await anecdoteService.remove(id);
      await get().actions.initialize();
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);
      set(() => ({ anecdotes: sortedAnecdotes }));
    },
  },
}));

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    notify: (notificationText) => {
      set(() => ({ notification: notificationText }));
      setTimeout(() => {
        set(() => ({ notification: null }));
      }, 5000);
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter) {
    const filtered = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );

    return filtered.toSorted((a, b) => b.votes - a.votes);
  }
  return anecdotes;
};

export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);
export const useNotificationActions = () => useNotificationStore((state) => state.actions);
export const useNotification = () => useNotificationStore((state) => state.notification);
