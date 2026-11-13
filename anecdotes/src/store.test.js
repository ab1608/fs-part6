import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  render,
  renderHook,
  act,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { createElement } from 'react';

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

import anecdoteService from './services/anecdotes.js';
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store';
import AnecdoteList from './components/AnecdoteList.jsx';
import Filter from './components/Filter.jsx';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: null });
  vi.clearAllMocks();
});

afterEach(cleanup);

describe('anecdotes', () => {
  it('renders only anecdotes matching the filter', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'React hooks are useful', votes: 2 },
        { id: 2, content: 'Hooks make state reusable', votes: 5 },
        { id: 3, content: 'Learning JavaScript', votes: 3 },
      ],
    });

    render(createElement('div', null, createElement(Filter), createElement(AnecdoteList)));

    fireEvent.change(screen.getByTestId('filter'), { target: { value: 'HOOKS' } });

    expect(screen.getByText('React hooks are useful')).toBeTruthy();
    expect(screen.getByText('Hooks make state reusable')).toBeTruthy();
    expect(screen.queryByText('Learning JavaScript')).toBeNull();
  });

  it('increases an anecdote vote when its vote button is clicked', async () => {
    const anecdote = { id: 1, content: 'Test anecdote', votes: 1 };
    useAnecdoteStore.setState({ anecdotes: [anecdote] });
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 2 });
    render(createElement(AnecdoteList));

    fireEvent.click(screen.getByRole('button', { name: 'vote' }));

    await waitFor(() => {
      expect(anecdoteService.update).toHaveBeenCalledWith(1, {
        ...anecdote,
        votes: 2,
      });
      expect(screen.getByText('has 2')).toBeTruthy();
    });
  });

  it('displays anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Few votes', votes: 1 },
      { id: 2, content: 'Most votes', votes: 5 },
      { id: 3, content: 'Some votes', votes: 3 },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
    const { container } = render(createElement(AnecdoteList));

    await act(async () => {
      await useAnecdoteStore.getState().actions.initialize();
    });

    const displayedContents = Array.from(
      container.firstChild.children,
      (anecdote) => anecdote.firstChild.textContent,
    );
    expect(displayedContents).toEqual(['Most votes', 'Some votes', 'Few votes']);
  });

  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResults } = renderHook(() => useAnecdotes());
    expect(anecdoteResults.current).toEqual(mockAnecdotes);
  });

  it('add appends a new anecdote', async () => {
    const newAnecdote = { id: 2, content: 'New anecdote', votes: 0 };
    anecdoteService.createNew.mockResolvedValue(newAnecdote);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.add('New anecdote');
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toContainEqual(newAnecdote);
  });
});
