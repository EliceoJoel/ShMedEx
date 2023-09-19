"use client";
import { FaHandHoldingMedical } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import NewCommentModal from "./modals/NewCommentModal";

function Interactions() {
	const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const handleLike = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	const handleComment = () => {
		//event.stopPropagation();
		document.getElementById("newCommentModal")?.showModal();
	};

	return (
		<div className="flex justify-between ml-10 pb-2">
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleFollow}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<FaHandHoldingMedical className="h-6 w-6 text-primary" />
				</button>
				<span className="md:hidden">23</span>
				<span className="hidden md:block">23 Seguidos</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleLike}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<AiFillHeart className="h-6 w-6 text-secondary" />
				</button>
				<span className="md:hidden">23</span>
				<span className="hidden md:block">23 Me gustas</span>
			</div>
			<div className="flex gap-1 items-center hover:cursor-pointer" onClick={handleComment}>
				<button className="btn btn-sm btn-ghost btn-circle">
					<FaComments className="h-6 w-6" />
				</button>
				<span className="md:hidden">23</span>
				<span className="hidden md:block">23 Comentarios</span>
			</div>
			<NewCommentModal />
		</div>
	);
}

export default Interactions;
