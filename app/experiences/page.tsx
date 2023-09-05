import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

function Experiences() {
	return (
		<div className="">
			<div className="flex justify-center w-full">
				<Navbar />
			</div>
			<div className="flex items-center w-full flex-col px-4 py-2 overflow-y-auto h-[calc(100vh-64px)] md:px-0">
				<Post />
				<Post />
			</div>
		</div>
	);
}

export default Experiences;
