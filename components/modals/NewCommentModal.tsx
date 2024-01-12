"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addCommentToPost, getPostComments } from "@/services/post";

import { usePostIdStore } from "@/store/postIdStore";
import { useUserStore } from "@/store/userStore";

import { NewComment } from "@/interfaces/inputs";
import { INewCommentModalProps } from "@/interfaces/objects";

import { NewCommentSchema, getYupSchema } from "@/yup/schemas";
import { toast } from "sonner";

function NewCommentModal({ setPostComments }: INewCommentModalProps) {
	const { postId } = usePostIdStore((state) => state);
	const { user: loggedUser } = useUserStore((state) => state);
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
				await addCommentToPost(postId, loggedUser.id, data.comment);
				await updateCommentsInUI();
			}

			// Sets loading to false
			setisAddingAComment(false);

			// Close new comment modal
			document.getElementById("newCommentModal")?.close();

			// Show sucess toast
			toast.success("Comentario agregado exitosamente!");

			// Clear comment field
			reset();
		} catch (error) {
			// Show error toast
			toast.error("Ocurrio un error al agregar el comentario");
		}
	});

	const updateCommentsInUI = async () => {
		// Gets and shows all comemnts in UI
		if (postId !== null && setPostComments != null) {
			const postCommentsData = await getPostComments(postId);
			setPostComments(postCommentsData);
		}
		//Updates number of comments in UI
		const mobileNumberOfCommentsSpan = document.getElementById(`mobileNumberOfCommentsPost${postId}`);
		const desktopNumberOfCommentsSpan = document.getElementById(`desktopNumberOfCommentsPost${postId}`);
		if (mobileNumberOfCommentsSpan !== null && desktopNumberOfCommentsSpan !== null) {
			desktopNumberOfCommentsSpan.innerText =
				(Number(mobileNumberOfCommentsSpan.textContent) + 1).toString() + " Comentarios";
			mobileNumberOfCommentsSpan.innerText = (Number(mobileNumberOfCommentsSpan.textContent) + 1).toString();
		}
	};

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
