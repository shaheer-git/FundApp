import { create } from 'zustand';
import { borrowers, investors } from "../constants/investers";

export const useStore = create((set) => ({
    searchQuery: '',
    userCreated: false,
    selectedMember: {},
    selectedMode: 'savers',
    setSelectedMode: (mode) => set(()=>({selectedMode: mode})),
    setSearchQuery: (query) => set(() => ({ searchQuery: query })),
    setUserCreated: (val) => set(()=>({userCreated: val})),
    setSelectedMember: (data) => set(() => ({ selectedMember: data })),
    getDemoBorrowers: () => borrowers,
    getDemoInvestors: () => investors,
}));
