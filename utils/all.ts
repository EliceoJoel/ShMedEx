export function formatDate(fecha: Date): string {
	const opciones: Intl.DateTimeFormatOptions = {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	const format = new Intl.DateTimeFormat("es-ES", opciones);
	const dateParts = format.formatToParts(fecha);

	const day = dateParts.find((part) => part.type === "day")?.value;
	const month = dateParts.find((part) => part.type === "month")?.value;
	const year = dateParts.find((part) => part.type === "year")?.value;
	const hour = dateParts.find((part) => part.type === "hour")?.value;
	const minute = dateParts.find((part) => part.type === "minute")?.value;

	const dateFormated = `${day}/${month}/${year} ${hour}:${minute}`;

	return dateFormated;
}
