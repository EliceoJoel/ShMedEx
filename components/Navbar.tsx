import React from "react";
import { TbHealthRecognition } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

function Navbar() {
	return (
		<div className="navbar bg-base-100 h-16 max-w-6xl">
			<div className="navbar-start">
				<div className="flex items-center p-2">
					<TbHealthRecognition className="h-8 w-8 text-primary" />
					<span className="uppercase font-semibold hidden md:block">ShMedEx</span>
				</div>
			</div>
			<div className="navbar-center gap-4">
				<button className="btn btn-primary normal-case md:hidden">
					<HiOutlineSwitchHorizontal className="h-6 w-6" /> Para ti
				</button>
				<button className="btn normal-case hidden md:inline-flex">Siguiendo</button>
				<button className="btn btn-primary normal-case hidden md:inline-flex"> Para ti</button>
			</div>
			<div className="navbar-end">
				<button className="btn btn-primary btn-circle md:hidden">
					<AiOutlinePlus className="h-6 w-6" />
				</button>
				<button className="btn btn-primary normal-case hidden md:inline-flex">
					<AiOutlinePlus className="h-6 w-6" /> Contar experiencia
				</button>
			</div>
		</div>
	);
}

export default Navbar;
