import NoDataImage from "@/public/nodata.svg";
import Image from "next/image";

function NoData() {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-2">
			<Image alt="No data image" src={NoDataImage} className="w-60"/>
			<p className="text-lg">No hay datos</p>
		</div>
	);
}

export default NoData;
