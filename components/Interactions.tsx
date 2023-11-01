"use client";
import { FaHandHoldingMedical } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import NewCommentModal from "./modals/NewCommentModal";
import { IInteractionsProps } from "@/interfaces/objects";
import { usePostIdStore } from "@/store/postIdStore";

function Interactions({ followers, likes, comments, postId }: IInteractionsProps) {
	const { setPostId } = usePostIdStore((state) => state);

	const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const handleLike = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const handleComment = () => {
		setPostId(postId);
		document.getElementById("newCommentModal")?.showModal();
	};

	return (
		<div className="flex justify-between ml-10 pb-2">
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleFollow}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<FaHandHoldingMedical className="h-6 w-6 text-primary" />
				</button>
				<span className="md:hidden">{followers}</span>
				<span className="hidden md:block">{`${followers} Seguidos`}</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleLike}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<AiFillHeart className="h-6 w-6 text-secondary" />
				</button>
				<span className="md:hidden">{likes}</span>
				<span className="hidden md:block">{`${likes} Me gustas`}</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleComment}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<FaComments className="h-6 w-6" />
				</button>
				<span className="md:hidden">{comments}</span>
				<span className="hidden md:block">{`${comments} Comentarios`}</span>
			</div>
			<NewCommentModal />
		</div>
	);
}

export default Interactions;
