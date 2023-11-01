"use client";
import Image from "next/image";
import avatarImage from "@/public/avatar.jpg";
import BackButton from "@/components/BackButton";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { IPostWithUserName } from "@/interfaces/objects";
import { getUserPosts } from "@/services/post";
import { useRouter } from "next/navigation";
import Post from "@/components/Post";

function Profile() {
	const { user } = useUserStore((user) => user);
	const router = useRouter();
	const [myPosts, setMyPosts] = useState<IPostWithUserName[]>([]);
	const [postsAreLoading, setPostsAreLoading] = useState(true);

	useEffect(() => {
		async function getMyPostsData(userId: number) {
			const data = await getUserPosts(userId);
			console.log(data);
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

	return (
		<div>
			<div className="flex justify-center">
				<div className="max-w-3xl w-full">
					<BackButton />
				</div>
			</div>
			<div className="flex flex-col items-center gap-4">
				<h1 className="font-bold text-lg">Mi Perfil</h1>
				<Image src={avatarImage} alt="user profile photo" className="rounded-full w-20 h-20" />
				<span>{user?.name + " " + user?.lastName}</span>
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
						{myPosts.map((postWithUsername) => (
							<Post postWithUserName={postWithUsername} setPostToEdit={null} key={postWithUsername.post.id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
