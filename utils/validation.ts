import { validImageExtensions } from "@/constants/all";

export function isValidNoRequiredImageType(fileList: any) {
	if (fileList.length === 0) return true; // No matters if image is undefined since there is an image uploaded, editing information
	const imageType = fileList[0].name.toLowerCase().split(".").pop();
	if (imageType !== undefined) {
		return validImageExtensions.includes(imageType);
	}
}