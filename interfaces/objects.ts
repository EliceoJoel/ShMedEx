import { Dispatch, SetStateAction } from "react";

export interface IPost {
	id: number;
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
	setPostComments: Dispatch<SetStateAction<ICommentFromDB[] | undefined>> | null;
	setPostToEdit: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setPostToRemove: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
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

export interface IPostModalProps {
	postToEdit: IPostWithUserName | null;
	changePostToEdit: Dispatch<SetStateAction<IPostWithUserName | null>> | null;
	setMyPosts: Dispatch<SetStateAction<IPostWithUserName[]>> | null;
}

export interface IConfirmationModalProps {
	confirmationText: string;
	yesAction: any;
	cancelAction: any;
}
