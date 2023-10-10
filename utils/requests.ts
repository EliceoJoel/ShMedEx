import { AuthRequestType, baseUrl } from "@/constants/all";
import { ISignIn, IUserToRegister } from "@/interfaces/inputs";
import { TokenDecoded } from "@/interfaces/objects";
import jwt_decode from "jwt-decode";

export async function login(userData: ISignIn) {
	const response = await fetchData(userData, AuthRequestType.LOGIN);
	if (response.ok) {
		const responseBody = await response.json();
		const token = responseBody.token;
		// Save token in localstorage
		localStorage.setItem("token", token);
		//decode jwt
		const jwtDecoded: TokenDecoded = jwt_decode(token);
		return { status: response.status, message: "Login successfully!", userInfo: jwtDecoded };
	} else if (response.status === 401) {
		const errorText = await response.text();
		return { status: response.status, message: errorText };
	} else {
		return { status: response.status, message: "Error interno, recargue la pagina" };
	}
}

export async function register(registerUserData: IUserToRegister) {
	const response = await fetchData(registerUserData, AuthRequestType.REGSITER);
	if (response.ok) {
		const responseBody = await response.json();
		const token = responseBody.token;
		// Save token in localstorage
		localStorage.setItem("token", token);
		//decode jwt
		const jwtDecoded: TokenDecoded = jwt_decode(token);
		return { status: response.status, message: "Registered successfully!", userInfo: jwtDecoded };
	} else if (response.status === 400) {
		const errorText = await response.text();
		return { status: response.status, message: errorText };
	} else {
		return { status: response.status, message: "Error interno, recargue la pagina" };
	}
}

async function fetchData(userData: ISignIn | IUserToRegister, authRequestType: AuthRequestType) {
	try {
		const response = await fetch(
			baseUrl + (authRequestType === AuthRequestType.LOGIN ? "/auth/login" : "/auth/register"),
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
