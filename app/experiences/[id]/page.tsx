"use client";

import BackButton from "@/components/BackButton";
import Comment from "@/components/Comment";
import Post from "@/components/Post";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import PostModal from "@/components/modals/PostModal";
import { ICommentFromDB, IPostAction, IPostDay, IPostWithUserName, User } from "@/interfaces/objects";
import { getDayListOfPost, getPostById, getPostComments, deletePost, deletePostDay } from "@/services/post";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SpecificPost({ params }: { params: { id: string } }) {
	const [postWithUserName, setPostWithUserName] = useState<IPostWithUserName | null>(null);
	const [postComments, setPostComments] = useState<ICommentFromDB[]>();
	const [postAction, setPostAction] = useState<IPostAction | null>(null);
	const [postToRemove, setPostToRemove] = useState<IPostWithUserName | null>(null);
	const [postDayToRemove, setPostDayToRemove] = useState<IPostDay | null>(null);
	const [postDays, setPostDays] = useState<number[] | null>(null);

	const { user } = useUserStore((store) => store);
	const router = useRouter();

	useEffect(() => {
		async function loadPostData(user: User) {
			const postDayList = await getDayListOfPost(parseInt(params.id));
			setPostDays(postDayList.sort((a: number, b: number) => a - b));
			const postData = await getPostById(parseInt(params.id), user.id, postDayList[0]);
			setPostWithUserName(postData);
		}
		async function loadPostCommentsData() {
			const postCommentsData = await getPostComments(Number(params.id));
			setPostComments(postCommentsData);
		}
		if (user !== null) {
			loadPostData(user);
			loadPostCommentsData();
		} else {
			router.push("/signin");
		}
	}, [params.id, router, user]);

	const removePostDayAction = async () => {
		if (postDayToRemove !== null && user !== null) {
			if (postDays?.length === 1) {
				await removePostAction();
				return;
			}
			await deletePostDay(postDayToRemove.id);
			//Get updated post data
			const postDayList = await getDayListOfPost(parseInt(params.id));
			setPostDays(postDayList.sort((a: number, b: number) => a - b));
			const postData = await getPostById(parseInt(params.id), user.id, postDayList[0]);
			setPostWithUserName(postData);

			closePostActionsDropdown();
			toast.success("Dia de la experiencia eliminada exitosamente!");
		}
	};

	const removePostAction = async () => {
		if (postToRemove !== null) {
			await deletePost(postToRemove.post.id);
			// Redirects to previous route.
			closePostActionsDropdown();
			toast.success("Experiencia eliminada exitosamente!");

			router.back();
		}
	};

	const cancelRemoveAction = () => {
		closePostActionsDropdown();
	};

	const closePostActionsDropdown = () => {
		document.getElementById(`actionsPost${params.id}`)?.removeAttribute("open");
	};

	return (
		<div>
			<div className="h-12 flex justify-center">
				<div className=" w-full max-w-3xl">
					<BackButton />
				</div>
			</div>
			{postWithUserName ? (
				<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
					<Post
						postWithUserName={postWithUserName}
						setPostWithUserName={setPostWithUserName}
						setPostAction={setPostAction}
						setPostComments={setPostComments}
						setPostToRemove={setPostToRemove}
						setPostDayToRemove={setPostDayToRemove}
						postDays={postDays}
					/>
					{postComments ? (
						<div className="w-full flex flex-col max-w-3xl">
							{postComments.map((postComment) => (
								<Comment
									content={postComment.comment.content}
									createdAt={postComment.comment.createdAt}
									userWhoCommented={postComment.userWhoCommented}
									key={postComment.comment.id}
								/>
							))}
						</div>
					) : (
						<div className="flex h-full justify-center">
							<span className="loading loading-infinity w-12 md:w-20"></span>
						</div>
					)}
				</div>
			) : (
				<div className="flex h-full justify-center">
					<span className="loading loading-infinity w-12 md:w-20"></span>
				</div>
			)}
			<PostModal postAction={postAction} setPostWithUserName={setPostWithUserName} setPostDays={setPostDays} />
			<ConfirmationModal
				confirmationText={
					postDayToRemove !== null
						? "¿Quieres eliminar este dia de la experiencia?"
						: "¿Quieres eliminar esta experiencia?"
				}
				yesAction={postDayToRemove !== null ? removePostDayAction : removePostAction}
				cancelAction={cancelRemoveAction}
			/>
		</div>
	);
}

export default SpecificPost;
