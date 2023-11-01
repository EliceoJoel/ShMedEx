import { create } from "zustand";

type State = {
	postId: number | null;
};

type Actions = {
	setPostId: (postId: number) => void;
};

export const usePostIdStore = create<State & Actions>((set) => ({
	postId: null,
	setPostId: (newPostId: number) => set(() => ({ postId: newPostId })),
}));
