"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { TbHealthRecognition } from "react-icons/tb";

import { ISignIn } from "@/interfaces/inputs";
import { UserRequestResult } from "@/interfaces/objects";
import { SignInSchema, getYupSchema } from "@/yup/schemas";
import { login } from "@/utils/requests";
import { userStore } from "@/store/userStore";

function Page() {
	const [isSignin, setIsSignin] = useState(false);
	const { setUser } = userStore((state) => state);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<ISignIn>(getYupSchema(SignInSchema));

	const handleSignIn = handleSubmit(async (data) => {
		setIsSignin(true);

		//Sign in with data base
		const statusResult: UserRequestResult = await login(data);
		if (statusResult.status === 200 && statusResult.userInfo !== undefined) {
			setUser({
				id: statusResult.userInfo.id,
				name: statusResult.userInfo.name,
				lastName: statusResult.userInfo.lastname,
				email: statusResult.userInfo.sub,
			});
			// redirect to experiences page
			router.push("/experiences");
		} else if (statusResult.status === 401) {
			setError("email", { type: "custom", message: statusResult.message });
			setError("password", { type: "custom", message: statusResult.message });
		} else {
			alert("Error interno, por favor recargue la pagina");
		}

		setIsSignin(false);
	});

	return (
		<div className="h-screen">
			<main className="h-full flex flex-col items-center p-4 md:justify-center">
				<div className="flex flex-col items-center mb-4">
					<TbHealthRecognition className="h-10 w-10 text-primary" />
					<h1 className="text-3xl font-bold">Inicio de sesión</h1>
				</div>
				<form className="md:w-[400px]" onSubmit={handleSignIn}>
					<div className="form-control w-full mb-1">
						<label className="label" htmlFor="inputEmail">
							<span className="label-text">Email</span>
						</label>
						<input
							autoComplete="off"
							id="inputEmail"
							type="text"
							placeholder="Escribe tu direccion email"
							className="input input-primary input-bordered w-full"
							{...register("email")}
						/>
						{errors.email && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.email.message}</span>
							</label>
						)}
					</div>
					<div className="form-control w-full mb-1">
						<label className="label" htmlFor="inputPassword">
							<span className="label-text">Contraseña</span>
						</label>
						<input
							autoComplete="off"
							id="inputPassword"
							type="password"
							placeholder="Escribe tu contraseña"
							className="input input-primary input-bordered w-full"
							{...register("password")}
						/>
						{errors.password && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.password.message}</span>
							</label>
						)}
					</div>
					<button className="btn btn-primary w-full mt-4" type="submit">
						{isSignin && <span className="loading loading-infinity loading-md"></span>}
						{isSignin ? "Iniciando sesión" : "Iniciar sesión"}
					</button>
				</form>
				<div className="mt-4">
					<p>
						Eres nuevo en shmedex?{" "}
						<Link href="/signup" className="text-primary underline">
							Registrate
						</Link>
					</p>
				</div>
			</main>
		</div>
	);
}

export default Page;
