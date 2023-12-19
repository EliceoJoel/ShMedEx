"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { GrMore } from "react-icons/gr";

import Interactions from "./Interactions";
import NewCommentModal from "./modals/NewCommentModal";

import avatarImage from "@/public/avatar.jpg";

import { IPostProps } from "@/interfaces/objects";
import { formatDate } from "@/utils/all";

function Post({ postWithUserName, setPostComments, setPostToEdit, setPostToRemove }: IPostProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handlePostClick = () => {
		router.push(`/experiences/${postWithUserName.post.id}`);
	};

	const handleRemovePost = () => {
		if (setPostToRemove !== null) {
			setPostToRemove(postWithUserName);
			document.getElementById("confirmationModal")?.showModal();
		}
	};

	const handleEditPost = () => {
		if (setPostToEdit !== null) {
			setPostToEdit(postWithUserName);
			document.getElementById("postModal")?.showModal();
		}
	};

	return (
		<div
			id={postWithUserName.post.id.toString()}
			className="flex flex-col gap-2 border-b border-b-gray-300 mb-4 max-w-3xl last:border-b-0 last:mb-0"
		>
			<div className="flex gap-2">
				<div className="avatar">
					<div className="w-8 mask mask-circle">
						<Image src={avatarImage} alt="user profile avatar" />
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">{postWithUserName.userName}</span>
						<span className="text-xs">{formatDate(new Date(postWithUserName.post.createdAt))}</span>
					</div>
					{pathname === "/profile" && (
						<details id={`actionsPost${postWithUserName.post.id}`} className="dropdown dropdown-end">
							<summary className="btn btn-sm btn-circle btn-ghost">
								<GrMore />
							</summary>
							<ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-24 bg-white">
								<li>
									<button onClick={handleEditPost}>Editar</button>
								</li>
								<li>
									<button onClick={handleRemovePost}>Eliminar</button>
								</li>
							</ul>
						</details>
					)}
				</div>
			</div>
			<div className="ml-10 hover:cursor-pointer" onClick={handlePostClick}>
				<p className="text-sm">{postWithUserName.post.content}</p>
				{postWithUserName.post.image != null && (
					<Image src={postWithUserName.post.image} alt="The post image" width={768} height={768} priority={true} />
				)}
			</div>
			<Interactions
				followers={postWithUserName.numberOfFollowers}
				likes={postWithUserName.numberOfLikes}
				comments={postWithUserName.numberOfComments}
				postId={postWithUserName.post.id}
				isFollowedByLoggedUSer={postWithUserName.isFollowedByUser}
				isLikedByLoggedUser={postWithUserName.isLikedByUser}
			/>
			<NewCommentModal setPostComments={setPostComments} />
		</div>
	);
}

export default Post;
