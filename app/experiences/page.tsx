"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

import { ExpPage } from "@/constants/all";

import { IPostWithUserName } from "@/interfaces/objects";

import { getFollowedPosts, getNotFollowedPosts } from "@/services/post";
import { useUserStore } from "@/store/userStore";

import PostModal from "@/components/modals/PostModal";
import NoData from "@/components/NoData";

function Experiences() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user } = useUserStore((user) => user);

	const [isDataLoading, setIsDataLoading] = useState(true);
	const [posts, setPosts] = useState<IPostWithUserName[]>([]);
	const [currentExpPage, setCurrentExpPage] = useState<string>("");

	useEffect(() => {
		async function getPostNotFollowedData(userId: number) {
			const data = await getNotFollowedPosts(userId);
			setPosts(data);
			setIsDataLoading(false);
		}
		async function getPostFollowedData(userId: number) {
			const data = await getFollowedPosts(userId);
			setPosts(data);
			setIsDataLoading(false);
		}
		setIsDataLoading(true);
		const token = localStorage.getItem("token");

		if (user === null || token === null) {
			router.push("/signin");
		} else {
			if (currentExpPage === ExpPage.FOR_YOU) {
				router.push("/experiences?type=foryou");
				getPostNotFollowedData(user.id);
			} else if (currentExpPage === ExpPage.FOLLOWING) {
				router.push("/experiences?type=following");
				getPostFollowedData(user.id);
			} else {
				if (searchParams.get("type")) {
					setCurrentExpPage(searchParams.get("type") as string);
				} else {
					getPostNotFollowedData(user.id);
				}
			}
		}
	}, [currentExpPage, user]);

	return (
		<div>
			<div className="flex justify-center w-full">
				<Navbar currentExpPage={currentExpPage} setCurrentExpPage={setCurrentExpPage} />
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				{isDataLoading ? (
					<div className="flex h-full justify-center">
						<span className="loading loading-infinity w-12 md:w-20"></span>
					</div>
				) : (
					<>
						{posts.length > 0 ? (
							posts.map((post) => {
								return (
									<Post
										key={post.post.id}
										postWithUserName={post}
										setPostComments={null}
										setPostToEdit={null}
										setPostToRemove={null}
										setPostAction={null}
									/>
								);
							})
						) : (
							<NoData />
						)}
					</>
				)}
			</div>
			<PostModal postToEdit={null} changePostToEdit={null} setMyPost={null} postAction={null}/>
		</div>
	);
}

export default Experiences;
