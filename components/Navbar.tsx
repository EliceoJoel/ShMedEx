"use client";

import Link from "next/link";

import { TbHealthRecognition } from "react-icons/tb";
import { AiOutlineLogout, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { ExpPage } from "@/constants/all";
import { INavBarProps } from "@/interfaces/objects";
import { useUserStore } from "@/store/userStore";

function Navbar({ currentExpPage, setCurrentExpPage }: INavBarProps) {
	const { user, setUser } = useUserStore((user) => user);

	const handleSwitch = (nextExpPage: string) => {
		setCurrentExpPage(nextExpPage);
	};

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("token");
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
					{currentExpPage === ExpPage.FOR_YOU || currentExpPage === "" ? "Para ti" : "Siguiendo"}
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
						(currentExpPage === ExpPage.FOR_YOU || currentExpPage === "") && "btn-primary"
					}`}
					onClick={() => {
						handleSwitch(ExpPage.FOR_YOU);
					}}
				>
					Para ti
				</button>
			</div>
			<div className="navbar-end gap-2">
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
				<details className="dropdown dropdown-end">
					<summary className="btn btn-circle">
						<div className="avatar placeholder text-base">
							<div className="bg-neutral text-neutral-content rounded-full w-12">
								<span>
									{user != undefined &&
										user.name.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
								</span>
							</div>
						</div>
					</summary>
					<ul className="p-2 mt-2 shadow menu dropdown-content bg-white rounded-box w-44">
						<li>
							<Link href="/profile">
								<AiOutlineUser className="h-6 w-6" />
								Mi perfil
							</Link>
						</li>
						<li>
							<button onClick={handleLogout}>
								<AiOutlineLogout className="h-6 w-6" />
								Cerrar sesión
							</button>
						</li>
					</ul>
				</details>
			</div>
		</div>
	);
}

export default Navbar;
