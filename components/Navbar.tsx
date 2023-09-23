"use client";

import { useState } from "react";
import { TbHealthRecognition } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { ExpPage } from "@/constants/all";

function Navbar() {
	const [currentExpPage, setCurrentExpPage] = useState<string>(ExpPage.FOR_YOU);

	const handleSwitch = (nextExpPage: string) => {
		setCurrentExpPage(nextExpPage);
	};

	return (
		<div className="navbar bg-base-100 h-16 max-w-6xl">
			<div className="navbar-start">
				<div className="flex items-center p-2">
					<TbHealthRecognition className="h-8 w-8 text-primary" />
					<span className="uppercase font-semibold hidden md:block">ShMedEx</span>
				</div>
			</div>
			<div className="navbar-center gap-4">
				<button
					className="btn btn-primary normal-case md:hidden"
					onClick={() => {
						handleSwitch(currentExpPage === ExpPage.FOLLOWING ? ExpPage.FOR_YOU : ExpPage.FOLLOWING);
					}}
				>
					<HiOutlineSwitchHorizontal className="h-6 w-6" />{" "}
					{currentExpPage === ExpPage.FOR_YOU ? "Para ti" : "Siguiendo"}
				</button>
				<button
					className={`btn normal-case hidden md:inline-flex ${
						currentExpPage === ExpPage.FOLLOWING && "btn-primary"
					}`}
					onClick={() => {
						handleSwitch(ExpPage.FOLLOWING);
					}}
				>
					Siguiendo
				</button>
				<button
					className={`btn normal-case hidden md:inline-flex ${
						currentExpPage === ExpPage.FOR_YOU && "btn-primary"
					}`}
					onClick={() => {
						handleSwitch(ExpPage.FOR_YOU);
					}}
				>
					Para ti
				</button>
			</div>
			<div className="navbar-end">
				<button
					className="btn btn-primary btn-circle md:hidden"
					onClick={() => document.getElementById("postModal")?.showModal()}
				>
					<AiOutlinePlus className="h-6 w-6" />
				</button>
				<button
					className="btn btn-primary normal-case hidden md:inline-flex"
					onClick={() => document.getElementById("postModal")?.showModal()}
				>
					<AiOutlinePlus className="h-6 w-6" /> Contar experiencia
				</button>
			</div>
		</div>
	);
}

export default Navbar;
