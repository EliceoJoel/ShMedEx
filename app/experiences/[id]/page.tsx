"use client";

import BackButton from "@/components/BackButton";
import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { IPostWithUserName } from "@/interfaces/objects";
import { getPostById } from "@/services/post";
import { useEffect, useState } from "react";

function SpecificPost({ params }: { params: { id: string } }) {
	const [postWithUserName, setPostWithUserName] = useState<IPostWithUserName>();

	useEffect(() => {
		async function getPostData() {
			const postData = await getPostById(params.id);
			setPostWithUserName(postData);
		}
		getPostData();
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
					<Post postWithUserName={postWithUserName} setPostToEdit={null} />
					<div className="w-full flex flex-col items-center">
						<Comments />
						<Comments />
						<Comments />
						<Comments />
					</div>
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
