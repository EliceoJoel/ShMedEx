"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { NewPost } from "@/interfaces/inputs";
import { IPost } from "@/interfaces/objects";
import { NewPostSchema, getYupSchema } from "@/yup/schemas";
import ImagePost from "@/public/avatar.jpg";
import { userStore } from "@/store/userStore";
import { createPost } from "@/services/post";

function PostModal({
	postToEdit,
	changePostToEdit,
}: {
	postToEdit: IPost | null;
	changePostToEdit: Dispatch<SetStateAction<IPost | null>>;
}) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<NewPost>(getYupSchema(NewPostSchema));

	const [isPublishing, setIsisPublishing] = useState(false);

	const { user: loggedUser } = userStore((user) => user);

	useEffect(() => {
		if (postToEdit != null) {
			setValue("post", postToEdit.text);
		}
	}, [postToEdit]);

	const handlePublish = handleSubmit(async (data) => {
		// loading started
		setIsisPublishing(true);

		//create post
		if (loggedUser !== null) {
			await createPost(data.post, data.image, loggedUser.id);
		}

		// clear fields
		reset();

		// Loading finished
		setIsisPublishing(false);

		//close modal
		document.getElementById("postModal")?.close();
	});

	return (
		<dialog id="postModal" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<h3 className="font-bold text-lg text-center mb-4">Nueva experiencia</h3>
				<form onSubmit={handlePublish}>
					<div className="form-control w-full mb-4">
						<textarea
							autoComplete="off"
							className="textarea textarea-primary w-full"
							placeholder="Cuentanos tu experiencia"
							{...register("post")}
						></textarea>
						{errors.post && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.post.message}</span>
							</label>
						)}
					</div>
					{postToEdit != null && (
						<div className="mb-4">
							<Image alt="Image of editing post" src={ImagePost} />
							<label>Selecciona una nueva imagen para reemplazar el actual</label>
						</div>
					)}
					<div className="form-control w-full mb-4">
						<input
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
							className="file-input file-input-bordered file-input-primary w-full"
							{...register("image")}
						/>
						{errors.image && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.image.message}</span>
							</label>
						)}
					</div>
					<div className="flex justify-end gap-4">
						<button
							className="btn"
							type="button"
							onClick={() => {
								document.getElementById("postModal")?.close();
								changePostToEdit(null);
								reset();
							}}
						>
							Cerrar
						</button>
						<button className="btn btn-primary" type="submit">
							{isPublishing && <span className="loading loading-infinity loading-md"></span>}
							{isPublishing ? "Publicando" : "Publicar"}
						</button>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button
					onClick={() => {
						changePostToEdit(null);
						reset();
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default PostModal;
