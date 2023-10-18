"use client";

import { useState } from "react";
import Image from "next/image";
import { GrMore } from "react-icons/gr";
import avatarImage from "@/public/avatar.jpg";
import { IPostWithUserName } from "@/interfaces/objects";
import { useRouter } from "next/navigation";
import Interactions from "./Interactions";
import PostModal from "./modals/PostModal";
import { formatDate } from "@/utils/all";

function Post({ postWithUserName }: { postWithUserName: IPostWithUserName }) {
	const router = useRouter();

	const [postToEdit, setPostToEdit] = useState<IPostWithUserName | null>(null);

	const handlePostClick = () => {
		router.push(`/experiences/${postWithUserName.post.id}`);
	};

	const handleRemovePost = () => {
		document.getElementById(postWithUserName.post.id.toString())?.remove();
	};

	const handleEditPost = () => {
		setPostToEdit(postWithUserName);
		document.getElementById("postModal")?.showModal();
	};

	return (
		<div className="flex flex-col gap-2 border-b border-b-gray-300 mb-4 max-w-3xl last:border-b-0 last:mb-0">
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
					<details className="dropdown dropdown-end">
						<summary
							className="btn btn-sm btn-circle btn-ghost"
							onClick={(event) => {
								event.stopPropagation();
							}}
						>
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
				</div>
			</div>
			<div className="ml-10 hover:cursor-pointer" onClick={handlePostClick}>
				<p className="text-sm">{postWithUserName.post.content}</p>
				{postWithUserName.post.image != null && (
					<Image src={postWithUserName.post.image} alt="The post image" width={768} height={768} priority={true} />
				)}
			</div>
			<Interactions />
			<PostModal postToEdit={postToEdit} changePostToEdit={setPostToEdit} />
		</div>
	);
}

export default Post;
