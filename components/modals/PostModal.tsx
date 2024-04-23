"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { NewPost } from "@/interfaces/inputs";
import { IPostModalProps } from "@/interfaces/objects";
import { NewPostSchema, getYupSchema } from "@/yup/schemas";
import { useUserStore } from "@/store/userStore";
import { addPostDay, createPost, getDayListOfPost, getImageUrl, getPostById, updatePostDay } from "@/services/post";
import { UserPostActions } from "@/constants/all";

function PostModal({ postAction, setPostWithUserName, setPostDays }: IPostModalProps) {
	const params = useParams();

	const { user: loggedUser } = useUserStore((user) => user);

	const [isPublishing, setIsisPublishing] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
		setError,
	} = useForm<NewPost>(getYupSchema(NewPostSchema));

	useEffect(() => {
		if (postAction?.action === UserPostActions.EDIT_POST_DAY) {
			setValue("postDay", postAction.postDay.day);
			setValue("post", postAction.postDay.content);
		}
	}, [postAction, setValue]);

	const handlePublish = handleSubmit(async (data) => {
		// loading started
		setIsisPublishing(true);

		if (postAction !== null) {
			switch (postAction.action) {
			case UserPostActions.ADD_POST_DAY:
				await handleAddPostDay(data);
				break;
			case UserPostActions.EDIT_POST_DAY:
				await handleEditPostDay(data);
				break;
			}
		} else if (loggedUser !== null) {
			// Create a post
			await createPost(data.postDay, data.post, data.image, loggedUser.id);
			toast.success("Experiencia publicada exitosamente!");
			// Clear fields
			reset();
			// Loading finished
			setIsisPublishing(false);
			// Close modal
			(document.getElementById("postModal") as HTMLDialogElement)?.close();
		}
	});

	const handleAddPostDay = async (data: NewPost) => {
		const response = await addPostDay(parseInt(params.id as string), {
			day: data.postDay,
			content: data.post,
			image: data.image,
		});
		// Loading finished
		setIsisPublishing(false);
		if (response?.status === 400) {
			setError("postDay", { message: response.message });
			return;
		}
		if (setPostDays !== null) {
			const postDayList = await getDayListOfPost(parseInt(params.id as string));
			setPostDays(postDayList.sort((a: number, b: number) => a - b));
		}
		closePostActionsDropdown();
		toast.success("Experiencia del dia agregado al post exitosamente!");
		// Clear fields
		reset();
		// Close modal
		(document.getElementById("postModal") as HTMLDialogElement)?.close();
	};

	const handleEditPostDay = async (data: NewPost) => {
		if (postAction !== null) {
			// Update post in db
			const imageUrlUpdated = data.image.length === 0 ? postAction.postDay.image : await getImageUrl(data.image);
			await updatePostDay(parseInt(params.id as string), {
				id: postAction?.postDay.id,
				day: data.postDay,
				content: data.post,
				image: imageUrlUpdated,
			});
			// Update post in the ui
			if (setPostWithUserName !== null && loggedUser !== null) {
				const postData = await getPostById(parseInt(params.id as string), loggedUser.id, postAction.postDay.day);
				setPostWithUserName(postData);
			}
			closePostActionsDropdown();
			toast.success(`La experiencia del dia ${postAction?.postDay.day} fue actualizada exitosamente!`);
			// Clear fields
			reset();
			// Close modal
			(document.getElementById("postModal") as HTMLDialogElement)?.close();
		}
	};

	const closePostActionsDropdown = () => {
		document.getElementById(`actionsPost${params.id}`)?.removeAttribute("open");
	};

	return (
		<dialog id="postModal" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<h3 className="font-bold text-lg text-center mb-4">
					{postAction?.action === UserPostActions.ADD_POST_DAY ? "Nueva experiencia" : "Editar Experiencia"}
				</h3>
				<form onSubmit={handlePublish}>
					<label className="form-control mb-4">
						<div className="label">
							<span className="label-text-alt text-base">Dia de la experiencia</span>
						</div>
						<input
							autoComplete="off"
							className="input input-bordered input-primary w-32"
							type="number"
							{...register("postDay")}
						/>
						{errors.postDay && (
							<div className="label">
								<span className="label-text-alt text-error">{errors.postDay.message}</span>
							</div>
						)}
					</label>
					<label className="form-control w-full mb-4">
						<div className="label">
							<span className="label-text-alt text-base">Descripcion de experiencia</span>
						</div>
						<textarea
							autoComplete="off"
							className="textarea textarea-primary w-full"
							placeholder="Cuentanos tu experiencia"
							{...register("post")}
						></textarea>
						{errors.post && (
							<div className="label">
								<span className="label-text-alt text-error">{errors.post.message}</span>
							</div>
						)}
					</label>
					{postAction?.action === UserPostActions.EDIT_POST_DAY && postAction?.postDay.image !== null && (
						<div className="mb-4">
							<Image
								alt="Image of editing post"
								src={postAction.postDay.image as string}
								width={768}
								height={768}
								priority={true}
							/>
							<label>Selecciona una nueva imagen para reemplazar el actual</label>
						</div>
					)}
					<label className="form-control w-full mb-4">
						<div className="label">
							<span className="label-text-alt text-base">Imagen de experiencia</span>
						</div>
						<input
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
							className="file-input file-input-bordered file-input-primary w-full"
							{...register("image")}
						/>
						{errors.image && (
							<div className="label">
								<span className="label-text-alt text-error">{errors.image.message}</span>
							</div>
						)}
					</label>
					<div className="flex justify-end gap-4">
						<button
							className="btn"
							type="button"
							onClick={() => {
								(document.getElementById("postModal") as HTMLDialogElement)?.close();
								reset();
								closePostActionsDropdown();
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
						reset();
						closePostActionsDropdown();
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default PostModal;
