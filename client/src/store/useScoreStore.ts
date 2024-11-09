import { create } from "zustand";

interface ScoreState {
    score: number;
}

const useScoreStore = create<ScoreState>(() => ({
    score: 1000,
}));

export default useScoreStore;
