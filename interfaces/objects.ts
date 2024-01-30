import { UserPostActions } from "@/constants/all";
import { Dispatch, SetStateAction } from "react";

export interface IPost {
	id: number;
}

export interface IPostDay {
	id: number;
	day: number;
	content: string;
	image: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface IComment {
	id: number;
	content: string;
	createdAt: string;
}

export interface User {
	id: number;
	name: string;
	lastName: string;
	email: string;
}

export interface TokenDecoded {
	exp: number;
	iat: number;
	id: number;
	lastname: string;
	name: string;
	sub: string;
}

export interface UserRequestResult {
	status: number;
	message: string;
	userInfo?: TokenDecoded;
}

export interface IPostWithUserName {
	post: IPost;
	userName: string;
	numberOfFollowers: number;
	numberOfComments: number;
	numberOfLikes: number;
	isFollowedByUser: boolean;
	isLikedByUser: boolean;
	isUserPost: boolean;
	postDays: IPostDay[];
}

export interface INavBarProps {
	currentExpPage: string;
	setCurrentExpPage: Dispatch<SetStateAction<string>>;
}

export interface IInteractionsProps {
	followers: number;
	likes: number;
	comments: number;
	postId: number;
	isFollowedByLoggedUSer: boolean;
	isLikedByLoggedUser: boolean;
}

export interface IPostProps {
	postWithUserName: IPostWithUserName;
	setPostWithUserName: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setPostComments: Dispatch<SetStateAction<ICommentFromDB[] | undefined>> | null;
	setPostToEdit: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setPostToRemove: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setPostAction: Dispatch<SetStateAction<IPostAction | null>> | null;
	postDays: number[] | null;
}

export interface ICommentProps {
	content: string;
	createdAt: string;
	userWhoCommented: string;
}

export interface ICommentFromDB {
	comment: {
		id: number;
		content: string;
		createdAt: string;
	};
	userWhoCommented: string;
}

export interface INewCommentModalProps {
	setPostComments: Dispatch<SetStateAction<ICommentFromDB[] | undefined>> | null;
}

export interface IPostModalProps {
	postAction: IPostAction | null;
	postToEdit: IPostWithUserName | null;
	changePostToEdit: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setMyPost: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
}

export interface IConfirmationModalProps {
	confirmationText: string;
	yesAction: any;
	cancelAction: any;
}

export interface IPostAction {
	post: IPostWithUserName;
	action:
		| UserPostActions.ADD_POST_DAY
		| UserPostActions.EDIT_POST_DAY
		| UserPostActions.DELETE_POST_DAY
		| UserPostActions.DELETE_POST;
}

export interface IDayToAdd {
	day: number;
	content: string;
	image: FileList;
}
