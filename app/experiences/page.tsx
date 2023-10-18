"use client";

import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { IPostWithUserName } from "@/interfaces/objects";
import { getNotFollowedPosts } from "@/services/post";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Experiences() {
	const router = useRouter();
	const { user } = userStore((user) => user);

	const [isDataLoading, setIsDataLoading] = useState(true);
	const [posts, setPosts] = useState<IPostWithUserName[]>([]);

	useEffect(() => {
		async function getPostData(userId: number) {
			const data = await getNotFollowedPosts(userId);
			setPosts(data);
			setIsDataLoading(false);
		}
		const token = localStorage.getItem("token");
		if (user === null || token === null) {
			router.push("/signin");
		} else {
			getPostData(user.id);
		}
	}, []);

	return (
		<div>
			<div className="flex justify-center w-full">
				<Navbar />
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				{isDataLoading ? (
					<div className="flex h-full justify-center">
						<span className="loading loading-infinity w-12 md:w-20"></span>
					</div>
				) : (
					<>
						{posts.map((post) => {
							return <Post postWithUserName={post} key={post.post.id} />;
						})}
					</>
				)}
			</div>
		</div>
	);
}

export default Experiences;
