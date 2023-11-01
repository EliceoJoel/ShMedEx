import { User } from "@/interfaces/objects";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	user: User | null;
}

interface Actions {
	setUser: (user: User | null) => void;
	removeUser: () => void;
}

export const useUserStore = create<State & Actions>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			removeUser: () => set({ user: null }),
		}),
		{ name: "userStore" }
	)
);
