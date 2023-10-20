"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import PostModal from "@/components/modals/PostModal";
import { ExpPage } from "@/constants/all";
import { IPostWithUserName } from "@/interfaces/objects";
import { getFollowedPosts, getNotFollowedPosts } from "@/services/post";
import { userStore } from "@/store/userStore";
import { LuMoreVertical } from "react-icons/lu";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

function Experiences() {
	const router = useRouter();
	const { user, setUser } = userStore((user) => user);

	const [isDataLoading, setIsDataLoading] = useState(true);
	const [posts, setPosts] = useState<IPostWithUserName[]>([]);
	const [currentExpPage, setCurrentExpPage] = useState<string>("");
	const [postToEdit, setPostToEdit] = useState<IPostWithUserName | null>(null);

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
				getPostNotFollowedData(user.id);
			}
		}
	}, [currentExpPage, user]);

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("token");
	};

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
						{posts.map((post) => {
							return <Post postWithUserName={post} key={post.post.id} setPostToEdit={setPostToEdit} />;
						})}
					</>
				)}
			</div>
			<details className="dropdown dropdown-top dropdown-end fixed bottom-2 right-2 md:bottom-8 md:right-20">
				<summary className="btn btn-circle btn-primary">
					<LuMoreVertical className="h-6 w-6" />
				</summary>
				<ul className="p-2 shadow menu dropdown-content bg-white rounded-box w-44">
					<li>
						<Link href="/profile">
							<AiOutlineUser className="h-6 w-6" />
							Mi perfil
						</Link>
					</li>
					<li>
						<button onClick={handleLogout}>
							<AiOutlineLogout className="h-6 w-6" />
							Cerrar sesión
						</button>
					</li>
				</ul>
			</details>
			<PostModal postToEdit={postToEdit} changePostToEdit={setPostToEdit} />
		</div>
	);
}

export default Experiences;
