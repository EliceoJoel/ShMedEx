import BackButton from "@/components/BackButton";
import Comments from "@/components/Comments";
import Post from "@/components/Post";

const MyPost = {
	id: "wdfsdfs",
	text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur earum nisi, odit officiis voluptatibus ullam mollitia tempora porro praesentium! Velit, similique non eveniet voluptates perferendis alias facilis voluptate neque?",
	image: "url",
	date: new Date(),
};

function SpecificPost() {
	return (
		<div>
			<div className="h-12 flex justify-center">
				<div className=" w-full max-w-3xl">
					<BackButton />
				</div>
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				<Post post={MyPost} />
				<div className="w-full flex flex-col items-center">
					<Comments />
					<Comments />
					<Comments />
					<Comments />
				</div>
			</div>
		</div>
	);
}

export default SpecificPost;
