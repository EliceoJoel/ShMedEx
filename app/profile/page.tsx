"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BackButton from "@/components/BackButton";
import Post from "@/components/Post";

import { useUserStore } from "@/store/userStore";
import { getUserPosts } from "@/services/post";

import { IPostWithUserName } from "@/interfaces/objects";
import NoData from "@/components/NoData";

function Profile() {
	const { user } = useUserStore((user) => user);
	const router = useRouter();

	const [myPosts, setMyPosts] = useState<IPostWithUserName[]>([]);
	const [postsAreLoading, setPostsAreLoading] = useState(true);

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
	}, [router, user]);

	return (
		<div>
			<div className="flex justify-center">
				<div className="max-w-3xl w-full">
					<BackButton />
				</div>
			</div>
			<div className="flex flex-col items-center gap-4">
				<div className="avatar placeholder">
					<div className="bg-neutral text-neutral-content rounded-full w-14 h-14">
						<span className="text-2xl">
							{user !== null && user.name.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
						</span>
					</div>
				</div>
				<h1 className="font-bold text-2xl md:text-3xl">{user?.name + " " + user?.lastName}</h1>
			</div>
			<div className="p-4">
				<h2 className="font-bold text-center">Mis experiencias publicadas</h2>
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
									setPostWithUserName={null}
									setPostComments={null}
									setPostToRemove={null}
									setPostDayToRemove={null}
									setPostAction={null}
									postDays={null}
								/>
							))
						) : (
							<NoData />
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
