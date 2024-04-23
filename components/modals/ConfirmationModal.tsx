"use client";

import { IConfirmationModalProps } from "@/interfaces/objects";

function ConfirmationModal({ confirmationText, yesAction, cancelAction }: IConfirmationModalProps) {
	return (
		<dialog id="confirmationModal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Confirmación</h3>
				<p className="py-4">{confirmationText}</p>
				<div className="flex justify-end gap-4">
					<button
						className="btn"
						onClick={() => {
							cancelAction();
							(document.getElementById("confirmationModal") as HTMLDialogElement)?.close();
						}}
					>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={() => {
							yesAction();
							(document.getElementById("confirmationModal") as HTMLDialogElement)?.close();
						}}
					>
						Confirmar
					</button>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button
					onClick={() => {
						cancelAction();
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default ConfirmationModal;
