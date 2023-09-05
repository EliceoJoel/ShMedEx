import Image from "next/image";
import React from "react";
import { GrMore } from "react-icons/gr";
import avatarImage from "@/public/avatar.jpg";

function Post() {
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
						<span className="text-xs">4 de Septiembre de 2023 - 12:34</span>
					</div>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-sm btn-circle btn-ghost">
							<GrMore />
						</label>
						<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-24 bg-white">
							<li>
								<a>Editar</a>
							</li>
							<li>
								<a>Eliminar</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="ml-10 pb-2">
				<p className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur earum nisi, odit officiis
					voluptatibus ullam mollitia tempora porro praesentium! Velit, similique non eveniet voluptates
					perferendis alias facilis voluptate neque?
				</p>
				<Image src={avatarImage} alt="post image" />
			</div>
		</div>
	);
}

export default Post;
