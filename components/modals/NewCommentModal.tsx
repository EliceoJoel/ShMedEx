"use client";

import { NewComment } from "@/interfaces/inputs";
import { NewCommentSchema, getYupSchema } from "@/yup/schemas";
import { useForm } from "react-hook-form";

function NewCommentModal() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewComment>(getYupSchema(NewCommentSchema));

	const handlePublish = handleSubmit(async (data) => {
		console.log(data);
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

export default NewCommentModal;
