import {create} from 'zustand';
import {useShallow} from 'zustand/react/shallow';

const useCounterStore = create((set) => ({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
    actions: {
        useGood: () => set((state) => ({good: state.good + 1, all: state.all + 1})),
        useNeutral: () => set((state) => ({neutral: state.neutral + 1, all: state.all + 1})),
        useBad: () => set((state) => ({bad: state.bad + 1, all: state.all + 1})),
        useAvg: () => set((state) => ({average: (state.good + state.bad * -1) / state.all})),
        usePositive: () => set((state) => ({positive: state.good / state.all})),

    },
}));

// Expose only the necessary parts of the state
export const useCounterControls = () => useCounterStore((state) => state.actions);
export const useValues = () =>
    useCounterStore(
        useShallow((state) => ({
            good: state.good,
            neutral: state.neutral,
            bad: state.bad,
            all: state.all,
            average: state.average,
            positive: state.positive,
        })),
    );
