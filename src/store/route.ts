import { create } from 'zustand';

type RouteIdStore = {
  routeId: number | null;
  updateRouteId: (id: number) => void;
};

export const useRouteIdStore = create<RouteIdStore>()((set) => ({
  routeId: 0,
  updateRouteId: (newId: number) => set(() => ({ routeId: newId })),
}));