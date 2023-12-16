"use client";

function ConfirmationModal({ confirmationText, yesAction }: { confirmationText: string; yesAction: any }) {
	return (
		<dialog id="confirmationModal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Confrimation</h3>
				<p className="py-4">{confirmationText}</p>
				<div className="flex justify-end gap-4">
					<button
						className="btn"
						onClick={() => {
							document.getElementById("confirmation_modal")?.close();
						}}
					>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={() => {
							yesAction();
							document.getElementById("confirmationModal")?.close();
						}}
					>
						Confirmar
					</button>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default ConfirmationModal;
