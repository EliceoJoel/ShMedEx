"use client";

import { NewComment } from "@/interfaces/inputs";
import { addCommentToPost } from "@/services/post";
import { usePostIdStore } from "@/store/postIdStore";
import { useUserStore } from "@/store/userStore";
import { NewCommentSchema, getYupSchema } from "@/yup/schemas";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function NewCommentModal() {
	const { postId } = usePostIdStore((state) => state);
	const { user: loggedUser } = useUserStore(state => state);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NewComment>(getYupSchema(NewCommentSchema));

	const [isAddingAComment, setisAddingAComment] = useState(false);

	const handlePublish = handleSubmit(async (data) => {
		try {
			// Sets loading to true
			setisAddingAComment(true);

			if (postId !== null && loggedUser !== null) {
				await addCommentToPost(postId, loggedUser.id,  data.comment);
			}

			// Sets loading to false
			setisAddingAComment(false);

			// Close new comment modal
			document.getElementById("newCommentModal")?.close();

			// Show sucess toast
			toast.success("Comment added successfully!");

			// Clear comment field
			reset();
		} catch (error) {
			toast.error("Error adding new comment");
		}
	});

	return (
		<dialog id="newCommentModal" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<h3 className="font-bold text-lg text-center mb-4">Nuevo Comentario</h3>
				<form onSubmit={handlePublish}>
					<div className="form-control w-full mb-4">
						<textarea
							autoComplete="off"
							className="textarea textarea-primary w-full"
							placeholder="Agrega tu comentario"
							{...register("comment")}
						></textarea>
						{errors.comment && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.comment.message}</span>
							</label>
						)}
					</div>
					<div className="flex justify-end gap-4">
						<button
							className="btn"
							type="button"
							onClick={() => document.getElementById("newCommentModal")?.close()}
						>
							Cerrar
						</button>
						<button className="btn btn-primary" type="submit">
							{isAddingAComment && <span className="loading loading-infinity loading-md"></span>}
							{isAddingAComment ? "Publicando" : "Publicar"}
						</button>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default NewCommentModal;
