"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

import { GrMore } from "react-icons/gr";

import Interactions from "./Interactions";
import NewCommentModal from "./modals/NewCommentModal";

import { IPostProps } from "@/interfaces/objects";
import { formatDate } from "@/utils/all";
import { UserPostActions } from "@/constants/all";
import { getPostById } from "@/services/post";
import { useUserStore } from "@/store/userStore";

function Post({
	postWithUserName,
	setPostWithUserName,
	setPostComments,
	setPostAction,
	setPostToRemove,
	setPostDayToRemove,
	postDays,
}: IPostProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	const [selectedDay, setSelectedDay] = useState<number>(postWithUserName.postDays[0].day);

	const { user: loggedUser } = useUserStore((store) => store);

	const handleViewMoreDays = () => {
		router.push(`/experiences/${postWithUserName.post.id}`);
	};

	const handleAddOrUpdatePostDay = (postAction: UserPostActions) => {
		if (setPostAction !== null) {
			const postDay = getPostDayByDayNumber(selectedDay);
			if (postDay !== undefined) {
				setPostAction({ postDay: postDay, action: postAction });
				document.getElementById("postModal")?.showModal();
			}
		}
	};

	const handleRemovePost = () => {
		if (setPostDayToRemove !== null && setPostToRemove !== null) {
			setPostDayToRemove(null);
			setPostToRemove(postWithUserName);
			document.getElementById("confirmationModal")?.showModal();
		}
	};

	const handleRemovePostDay = () => {
		if (setPostDayToRemove !== null && setPostToRemove !== null) {
			const postDay = getPostDayByDayNumber(selectedDay);
			if (postDay !== undefined) {
				setPostDayToRemove(postDay);
				setPostToRemove(null);
				document.getElementById("confirmationModal")?.showModal();
			}
		}
	};

	const handleDaySelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (setPostWithUserName !== null && loggedUser !== null) {
			const postData = await getPostById(parseInt(params.id as string), loggedUser.id, parseInt(event.target.value));
			setPostWithUserName(postData);
			setSelectedDay(parseInt(event.target.value));
		}
	};

	const getPostDayByDayNumber = (dayNumber: number) => {
		return postWithUserName.postDays.find((postDay) => (postDay.day = dayNumber));
	};

	return (
		<div
			id={postWithUserName.post.id.toString()}
			className="flex flex-col gap-2 border-b border-b-gray-300 mb-4 w-full max-w-3xl last:border-b-0 last:mb-0"
		>
			<div className="flex gap-2">
				<div className="avatar placeholder">
					<div className={`${postWithUserName.isUserPost ? "bg-primary" : "bg-neutral text-neutral-content"} font-bold rounded-full w-9 h-9`}>
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
							<select
								name="daySelect"
								id="daySelect"
								className="select select-primary select-sm"
								onChange={handleDaySelectChange}
							>
								{postDays?.map((postDay) => (
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
										<button onClick={() => handleAddOrUpdatePostDay(UserPostActions.ADD_POST_DAY)}>
											Añadir dia
										</button>
									</li>
									<li>
										<button onClick={() => handleAddOrUpdatePostDay(UserPostActions.EDIT_POST_DAY)}>
											Editar dia
										</button>
									</li>
									<li>
										<button onClick={handleRemovePostDay}>Eliminar dia</button>
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
				isUserPost={postWithUserName.isUserPost}
			/>
			<NewCommentModal setPostComments={setPostComments} />
		</div>
	);
}

export default Post;
