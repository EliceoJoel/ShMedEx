"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { ISignUp } from "@/interfaces/inputs";
import { SignUpSchema } from "@/yup/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbHealthRecognition } from "react-icons/tb";

function Page() {
	const [isSigninUp, setIsSigninUp] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUp>({ resolver: yupResolver(SignUpSchema) });

	const handleSignUp = handleSubmit((data) => {
		setIsSigninUp(true);

		console.log(data);

		setIsSigninUp(false);
	});
	return (
		<div className="h-screen">
			<main className="h-full flex flex-col items-center p-4 md:justify-center">
				<div className="flex flex-col items-center mb-4">
					<TbHealthRecognition className="h-10 w-10 text-primary" />
					<h1 className="text-3xl font-bold">Registro de usuario</h1>
				</div>
				<form className="md:w-[400px]" onSubmit={handleSignUp}>
					<div className="form-control w-full mb-1">
						<label className="label" htmlFor="inputName">
							<span className="label-text">Nombre(s)</span>
						</label>
						<input
							autoComplete="off"
							id="inputName"
							type="text"
							placeholder="Escribe tu nombre(s)"
							className="input input-primary input-bordered w-full"
							{...register("name")}
						/>
						{errors.name && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.name.message}</span>
							</label>
						)}
					</div>
					<div className="form-control w-full mb-1">
						<label className="label" htmlFor="inputLastName">
							<span className="label-text">Apellido(s)</span>
						</label>
						<input
							autoComplete="off"
							id="inputLastName"
							type="text"
							placeholder="Escribe tu apeliido(s)"
							className="input input-primary input-bordered w-full"
							{...register("lastName")}
						/>
						{errors.lastName && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.lastName.message}</span>
							</label>
						)}
					</div>
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
					<div className="form-control w-full mb-1">
						<label className="label" htmlFor="inputConfirmPassword">
							<span className="label-text">Confirmar contraseña</span>
						</label>
						<input
							autoComplete="off"
							id="inputConfirmPassword"
							type="password"
							placeholder="Escribe la misma contraseña"
							className="input input-primary input-bordered w-full"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.confirmPassword.message}</span>
							</label>
						)}
					</div>
					<button className="btn btn-primary w-full mt-4" type="submit">
						{isSigninUp && <span className="loading loading-infinity loading-md"></span>}
						{isSigninUp ? "Registrando" : "Registrarse"}
					</button>
				</form>
				<div className="mt-4">
					<p>
						Ya tienes una cuenta en ShMedEx?{" "}
						<Link href="/signin" className="text-primary underline">
							Inicia sesión
						</Link>
					</p>
				</div>
			</main>
		</div>
	);
}

export default Page;
