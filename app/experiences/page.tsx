import Navbar from "@/components/Navbar";
import NewPost from "@/components/modals/NewPostModal";
import Post from "@/components/Post";

const MyPost = {
	id: "wdfsdfs",
	text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur earum nisi, odit officiis voluptatibus ullam mollitia tempora porro praesentium! Velit, similique non eveniet voluptates perferendis alias facilis voluptate neque?",
	image: "url",
	date: new Date(),
};

function Experiences() {
	return (
		<div>
			<div className="flex justify-center w-full">
				<Navbar />
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				<Post post={MyPost} />
				<Post post={MyPost} />
			</div>
			<NewPost />
		</div>
	);
}

export default Experiences;
