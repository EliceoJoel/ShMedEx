"use client";

import { NewPost } from "@/interfaces/inputs";
import { NewPostSchema, getYupSchema } from "@/yup/schemas";
import { useForm } from "react-hook-form";

function NewPostModal() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewPost>(getYupSchema(NewPostSchema));

	const handlePublish = handleSubmit(async (data) => {
		console.log(data);
	});

	return (
		<dialog id="newPostModal" className="modal modal-bottom sm:modal-middle">
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
							onClick={() => document.getElementById("newPostModal")?.close()}
						>
							Cerrar
						</button>
						<button className="btn btn-primary" type="submit">
							Publicar
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

export default NewPostModal;
