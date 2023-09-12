"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

function BackButton() {
	const router = useRouter();
	return (
		<button className="btn btn-circle btn-ghost" onClick={() => router.back()}>
			<AiOutlineArrowLeft className="h-6 w-6" />
		</button>
	);
}

export default BackButton;
