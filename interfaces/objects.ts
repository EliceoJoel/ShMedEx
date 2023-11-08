import { Dispatch, SetStateAction } from "react";

export interface IPost {
	id: number;
	content: string;
	image: string | null;
	likes: number;
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
}

export interface IPostProps {
	postWithUserName: IPostWithUserName;
	setPostToEdit: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setPostComments: Dispatch<SetStateAction<ICommentFromDB[] | undefined>> | null;
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
	},
	userWhoCommented: string;
}

export interface INewCommentModalProps {
	setPostComments: Dispatch<SetStateAction<ICommentFromDB[] | undefined>> | null;
}
