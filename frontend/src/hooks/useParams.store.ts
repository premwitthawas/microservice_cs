import { create } from "zustand";
export type ParamsState = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
  searchValue: string;
  orderBy: string;
  filterBy: string;
};

export type ParamsActions = {
  setParams: (params: Partial<ParamsState>) => void;
  resetParams: () => void;
  setSearchValue: (value: string) => void;
};

const intialState: ParamsState = {
  pageNumber: 1,
  pageCount: 1,
  pageSize: 12,
  searchTerm: "",
  searchValue: "",
  orderBy: "make",
  filterBy: 'live'
};

export type ParamsStore = ParamsState & ParamsActions;

export const useParamsStore = create<ParamsStore>((set) => ({
  ...intialState,
  setParams: (newParams: Partial<ParamsState>) => {
    set((state) => {
      if (newParams.pageNumber) {
        return {
          ...state,
          pageNumber: newParams.pageNumber,
        };
      } else {
        return { ...state, ...newParams, pageNumber: 1 };
      }
    });
  },
  resetParams: () => set(() => ({ ...intialState })),
  setSearchValue: (value: string) => set(() => ({ searchValue: value })),
}));
