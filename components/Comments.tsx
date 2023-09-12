import Image from "next/image";
import avatarImage from "@/public/avatar.jpg";

function Comments() {
	return (
		<div className="border-b border-b-gray-300 mb-4 max-w-3xl last:border-b-0 last:mb-0">
			<div className="flex gap-2">
				<div className="avatar">
					<div className="w-8 mask mask-circle">
						<Image src={avatarImage} alt="user profile avatar" />
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">Eliceo Joel Herbas Inocente</span>
						<span className="text-xs">fecha</span>
					</div>
				</div>
			</div>
			<div className="ml-10">
				<p className="text-sm">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum animi mollitia molestias aliquam
					accusantium, aliquid excepturi atque, doloremque necessitatibus deleniti perferendis laborum voluptatum
					sapiente veniam, vero at et eos error.
				</p>
			</div>
		</div>
	);
}

export default Comments;
