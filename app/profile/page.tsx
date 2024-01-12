"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import BackButton from "@/components/BackButton";
import Post from "@/components/Post";
import PostModal from "@/components/modals/PostModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

import { useUserStore } from "@/store/userStore";
import { getUserPosts, removePost } from "@/services/post";

import { IPostWithUserName } from "@/interfaces/objects";
import avatarImage from "@/public/avatar.jpg";
import NoData from "@/components/NoData";

function Profile() {
	const { user } = useUserStore((user) => user);
	const router = useRouter();
	const [myPosts, setMyPosts] = useState<IPostWithUserName[]>([]);
	const [postsAreLoading, setPostsAreLoading] = useState(true);
	const [postToEdit, setPostToEdit] = useState<IPostWithUserName | null>(null);
	const [postToRemove, setPostToRemove] = useState<IPostWithUserName | null>(null);

	useEffect(() => {
		async function getMyPostsData(userId: number) {
			const data = await getUserPosts(userId);
			setMyPosts(data);
			setPostsAreLoading(false);
		}
		const token = localStorage.getItem("token");

		if (user === null || token === null) {
			router.push("/signin");
		} else {
			getMyPostsData(user.id);
		}
	}, []);

	const removePostAction = async () => {
		if (postToRemove !== null) {
			// Removes from the UI
			setMyPosts(myPosts.filter((post) => post.post.id !== postToRemove.post.id));
			// Removes from database
			await removePost(postToRemove.post.id);
			// Close actions dropdown
			closePostActionsDropdown();
		}
	};

	const cancelRemoveAction = () => {
		closePostActionsDropdown();
	};

	const closePostActionsDropdown = () => {
		if (postToRemove !== null) {
			document.getElementById(`actionsPost${postToRemove.post.id}`)?.removeAttribute("open");
		}
	};

	return (
		<div>
			<div className="flex justify-center">
				<div className="max-w-3xl w-full">
					<BackButton />
				</div>
			</div>
			<div className="flex flex-col items-center gap-4">
				<Image src={avatarImage} alt="user profile photo" className="rounded-full w-20 h-20" />
				<h1 className="font-bold text-2xl md:text-3xl">{user?.name + " " + user?.lastName}</h1>
			</div>
			<div className="p-4">
				<h2 className="font-bold text-center">My Posts</h2>
				<div className="flex justify-center">
					<div className="divider mt-0 max-w-3xl w-full"></div>
				</div>

				{postsAreLoading ? (
					<div className="flex h-full justify-center">
						<span className="loading loading-infinity w-12 md:w-20"></span>
					</div>
				) : (
					<div className="flex flex-col items-center">
						{myPosts.length > 0 ? (
							myPosts.map((postWithUsername) => (
								<Post
									key={postWithUsername.post.id}
									postWithUserName={postWithUsername}
									setPostComments={null}
									setPostToEdit={setPostToEdit}
									setPostToRemove={setPostToRemove}
								/>
							))
						) : (
							<NoData />
						)}
					</div>
				)}
			</div>
			<PostModal postToEdit={postToEdit} changePostToEdit={setPostToEdit} setMyPosts={setMyPosts} />
			<ConfirmationModal
				confirmationText="¿Quieres eliminar este post?"
				yesAction={removePostAction}
				cancelAction={cancelRemoveAction}
			/>
		</div>
	);
}

export default Profile;
