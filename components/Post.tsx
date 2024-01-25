"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { GrMore } from "react-icons/gr";

import Interactions from "./Interactions";
import NewCommentModal from "./modals/NewCommentModal";

import { IPostProps } from "@/interfaces/objects";
import { formatDate } from "@/utils/all";
import { UserPostActions } from "@/constants/all";

const postDays = [1, 2, 3, 4, 5];

function Post({ postWithUserName, setPostComments, setPostAction,setPostToEdit, setPostToRemove }: IPostProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleViewMoreDays = () => {
		router.push(`/experiences/${postWithUserName.post.id}`);
	};

	const handleAddPostDay = () => {
		if (setPostAction !== null) {
			setPostAction({post: postWithUserName, action: UserPostActions.ADD_POST_DAY});
			document.getElementById("postModal")?.showModal();
		}
	};

	const handleEditPost = () => {
		if (setPostToEdit !== null) {
			setPostToEdit(postWithUserName);
			document.getElementById("postModal")?.showModal();
		}
	};

	const handleRemovePost = () => {
		if (setPostToRemove !== null) {
			setPostToRemove(postWithUserName);
			document.getElementById("confirmationModal")?.showModal();
		}
	};

	return (
		<div
			id={postWithUserName.post.id.toString()}
			className="flex flex-col gap-2 border-b border-b-gray-300 mb-4 w-full max-w-3xl last:border-b-0 last:mb-0"
		>
			<div className="flex gap-2">
				<div className="avatar placeholder">
					<div className="bg-neutral text-neutral-content rounded-full w-9 h-9">
						<span className="text-xs">
							{postWithUserName.userName.split(" ")[0].charAt(0).toUpperCase() +
								postWithUserName.userName.split(" ")[1].charAt(0).toUpperCase()}
						</span>
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">{postWithUserName.userName}</span>
						<span className="text-xs">{formatDate(new Date(postWithUserName.postDays[0].createdAt))}</span>
					</div>
					<div className="flex gap-2">
						<div className={`${!pathname.includes("/experiences/") && "hidden"}`}>
							<label htmlFor="daySelect">Dia: </label>
							<select name="daySelect" id="daySelect" className="select select-primary select-sm">
								{postDays.map((postDay) => (
									<option key={postDay} value={postDay}>
										{postDay}
									</option>
								))}
							</select>
						</div>
						<button
							className={`btn btn-neutral btn-sm normal-case ${pathname.includes("/experiences/") && "hidden"}`}
							onClick={handleViewMoreDays}
						>
							Ver mas
						</button>
						{pathname !== "/profile" && postWithUserName.isUserPost && (
							<details id={`actionsPost${postWithUserName.post.id}`} className="dropdown dropdown-end">
								<summary className="btn btn-sm btn-circle btn-ghost">
									<GrMore />
								</summary>
								<ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-44 bg-white mt-2">
									<li>
										<button onClick={handleAddPostDay}>Añadir dia</button>
									</li>
									<li>
										<button onClick={handleEditPost}>Editar dia</button>
									</li>
									<li>
										<button>Eliminar dia</button>
									</li>
									<li>
										<button onClick={handleRemovePost}>Eliminar experiencia</button>
									</li>
								</ul>
							</details>
						)}
					</div>
				</div>
			</div>
			<div className="ml-10">
				<p className="text-sm">
					<span className="font-bold">Dia {postWithUserName.postDays[0].day}: </span>
					{postWithUserName.postDays[0].content}
				</p>
				{postWithUserName.postDays[0].image !== null && (
					<Image
						src={postWithUserName.postDays[0].image}
						alt="The post image"
						width={768}
						height={768}
						priority={true}
					/>
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
