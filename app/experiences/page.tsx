"use client";

import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { IPost } from "@/interfaces/objects";
import { getNotFollowedPosts } from "@/services/post";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyPost1 = {
	id: "wdfsdfs1",
	text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur earum nisi, odit officiis voluptatibus ullam mollitia tempora porro praesentium! Velit, similique non eveniet voluptates perferendis alias facilis voluptate neque?",
	image: "url",
	date: new Date(),
};

const MyPost2 = {
	id: "wdfsdfs2",
	text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur earum nisi, odit officiis voluptatibus ullam mollitia tempora porro praesentium! Velit, similique non eveniet voluptates perferendis alias facilis voluptate neque?",
	image: "url",
	date: new Date(),
};

function Experiences() {
	const router = useRouter();
	const { user } = userStore((user) => user);

	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		async function getPostData(token: string, userId: number) {
			const data = await getNotFollowedPosts(userId);
			setPosts(data);
		}
		const token = localStorage.getItem("token");
		if (user === null || token === null) {
			router.push("/signin");
		} else {
			getPostData(token, user.id);
		}
	}, []);

	return (
		<div>
			<div className="flex justify-center w-full">
				<Navbar />
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				<Post post={MyPost1} />
				<Post post={MyPost2} />
			</div>
		</div>
	);
}

export default Experiences;
