"use client";

import BackButton from "@/components/BackButton";
import Comment from "@/components/Comment";
import Post from "@/components/Post";
import { ICommentFromDB, IPostWithUserName, User } from "@/interfaces/objects";
import { getPostById, getPostComments } from "@/services/post";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SpecificPost({ params }: { params: { id: string } }) {
	const [postWithUserName, setPostWithUserName] = useState<IPostWithUserName>();
	const [postComments, setPostComments] = useState<ICommentFromDB[]>();

	const { user } = useUserStore((store) => store);
	const router = useRouter();

	useEffect(() => {
		async function getPostData(user: User) {
			const postData = await getPostById(params.id, user.id);
			setPostWithUserName(postData);
		}
		async function getPostCommentsData() {
			const postCommentsData = await getPostComments(Number(params.id));
			setPostComments(postCommentsData);
		}
		if (user !== null) {
			getPostData(user);
			getPostCommentsData();
		} else {
			router.push("/signin");
		}
	}, []);

	return (
		<div>
			<div className="h-12 flex justify-center">
				<div className=" w-full max-w-3xl">
					<BackButton />
				</div>
			</div>
			{postWithUserName ? (
				<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
					<Post postWithUserName={postWithUserName} setPostToEdit={null} setPostComments={setPostComments} />
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
		</div>
	);
}

export default SpecificPost;
