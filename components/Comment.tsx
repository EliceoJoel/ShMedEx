import Image from "next/image";
import avatarImage from "@/public/avatar.jpg";
import { ICommentProps } from "@/interfaces/objects";
import { formatDate } from "@/utils/all";

function Comment({ content, createdAt, userWhoCommented }: ICommentProps) {
	return (
		<div className="border-b border-b-gray-300 mb-4 max-w-3xl pb-2 last:border-b-0 last:mb-0 last:pb-0">
			<div className="flex gap-2">
				<div className="avatar placeholder">
					<div className="bg-neutral text-neutral-content font-bold rounded-full w-9 h-9">
						<span className="text-xs">
							{userWhoCommented.split(" ")[0].charAt(0).toUpperCase() +
								userWhoCommented.split(" ")[1].charAt(0).toUpperCase()}
						</span>
					</div>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">{userWhoCommented}</span>
						<span className="text-xs">{formatDate(new Date(createdAt))}</span>
					</div>
				</div>
			</div>
			<div className="ml-10">
				<p className="text-sm">{content}</p>
			</div>
		</div>
	);
}

export default Comment;
