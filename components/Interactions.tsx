"use client";
import { FaHandHoldingMedical } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

import { usePostIdStore } from "@/store/postIdStore";

import { IInteractionsProps } from "@/interfaces/objects";
import { toggleLike } from "@/services/post";
import { useUserStore } from "@/store/userStore";

function Interactions({
	followers,
	likes,
	comments,
	postId,
	isFollowedByLoggedUSer,
	isLikedByLoggedUser,
}: IInteractionsProps) {
	const { user } = useUserStore((state) => state);
	const { setPostId } = usePostIdStore((state) => state);

	const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const handleLike = async () => {
		// Change color of the like button and increase or decrese the number
		toggleLikeInUI();
		// Toggle like in server side
		if(user !== null) {
			await toggleLike(postId, user.id);
		}
	};

	const toggleLikeInUI = () => {
		const numberOfLikesMobileSpan = document.getElementById(`mobileNumberOfLikesPost${postId}`);
		const numberOfLikesDesktopSpan = document.getElementById(`desktopNumberOfLikesPost${postId}`);
		if (numberOfLikesMobileSpan !== null && numberOfLikesDesktopSpan !== null) {
			const currentNumberOfLikes: number = Number(numberOfLikesMobileSpan.textContent);
			const likeButton = document.getElementById(`likeButtonOfPost${postId}`);
			const postIsAlreadyLiked = likeButton?.firstElementChild?.classList.contains("text-secondary");
			if (postIsAlreadyLiked) {
				likeButton?.firstElementChild?.classList.remove("text-secondary");
				numberOfLikesDesktopSpan.innerText = (currentNumberOfLikes - 1).toString() + " Comentarios";
				numberOfLikesMobileSpan.innerText = (currentNumberOfLikes - 1).toString();
			} else {
				likeButton?.firstElementChild?.classList.add("text-secondary");
				numberOfLikesDesktopSpan.innerText = (currentNumberOfLikes + 1).toString() + " Comentarios";
				numberOfLikesMobileSpan.innerText = (currentNumberOfLikes + 1).toString();
			}
		}
	};

	const handleComment = () => {
		setPostId(postId);
		document.getElementById("newCommentModal")?.showModal();
	};

	return (
		<div className="flex justify-between ml-10 pb-2">
			<div className="flex gap-1 items-center hover:cursor-pointer">
				<button className="btn btn-sm btn-ghost btn-circle" onClick={handleFollow}>
					<FaHandHoldingMedical className={`h-6 w-6 ${isFollowedByLoggedUSer && "text-primary"}`} />
				</button>
				<span className="md:hidden">{followers}</span>
				<span className="hidden md:block">{`${followers} Seguidos`}</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer">
				<button id={`likeButtonOfPost${postId}`} className="btn btn-sm btn-ghost btn-circle" onClick={handleLike}>
					<AiFillHeart className={`h-6 w-6 ${isLikedByLoggedUser && "text-secondary"}`} />
				</button>
				<span id={`mobileNumberOfLikesPost${postId}`} className="md:hidden">
					{likes}
				</span>
				<span id={`desktopNumberOfLikesPost${postId}`} className="hidden md:block">{`${likes} Me gustas`}</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleComment}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<FaComments className="h-6 w-6" />
				</button>
				<span id={`mobileNumberOfCommentsPost${postId}`} className="md:hidden">
					{comments}
				</span>
				<span
					id={`desktopNumberOfCommentsPost${postId}`}
					className="hidden md:block"
				>{`${comments} Comentarios`}</span>
			</div>
		</div>
	);
}

export default Interactions;
