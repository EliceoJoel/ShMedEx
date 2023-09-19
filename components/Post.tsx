"use client";
import Image from "next/image";
import { GrMore } from "react-icons/gr";
import avatarImage from "@/public/avatar.jpg";
import { Post } from "@/interfaces/objects";
import { useRouter } from "next/navigation";
import Interactions from "./Interactions";

function Post({ post }: { post: Post }) {
	const router = useRouter();

	const handlePostClick = () => {
		router.push(`/experiences/${post.id}`);
	};

	return (
		<div className="flex flex-col gap-2 border-b border-b-gray-300 mb-4 max-w-3xl last:border-b-0 last:mb-0">
			<div className="flex gap-2">
				<div className="avatar">
					<div className="w-8 mask mask-circle">
						<Image src={avatarImage} alt="user profile avatar" />
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">Eliceo Joel Herbas Inocente</span>
						<span className="text-xs">{post.date.toDateString() + "-" + post.date.toTimeString()}</span>
					</div>
					<details className="dropdown dropdown-end">
						<summary
							className="btn btn-sm btn-circle btn-ghost"
							onClick={(event) => {
								event.stopPropagation();
							}}
						>
							<GrMore />
						</summary>
						<ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-24 bg-white">
							<li>
								<a>Editar</a>
							</li>
							<li>
								<a>Eliminar</a>
							</li>
						</ul>
					</details>
				</div>
			</div>
			<div className="ml-10 hover:cursor-pointer" onClick={handlePostClick}>
				<p className="text-sm">{post.text}</p>
				{post.image && <Image src={avatarImage} alt="post image" />}
			</div>
			<Interactions />
		</div>
	);
}

export default Post;
