import Image from "next/image";
import homeImage from "@/public/home.svg";
import Link from "next/link";

function Home() {
	return (
		<main className="h-screen flex gap-4 flex-col justify-center items-center px-4">
			<h1 className="text-6xl font-semibold">SHMEDEX</h1>
			<Image src={homeImage} alt="Injured man in recovery" className="w-40" />
			<p className="max-w-lg text-center text-lg">
				Comparte experiencias medicas de recuperacion con el mundo o revisalos como referencia en tu etapa de
				recuperación
			</p>
			<div className="flex gap-4 mt-4">
				<Link className="btn btn-primary" href="/signin">Iniciar sesión</Link>
				<Link className="btn" href="/signup">Registrate</Link>
			</div>
		</main>
	);
}

export default Home;
