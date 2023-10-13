export interface IPost {
	id: string;
	text: string;
	image: string | undefined;
	date: Date;
}

export interface User {
	id: number;
	name: string;
	lastName: string;
	email: string;
}

export interface TokenDecoded {
	exp: number;
	iat: number;
	id: number;
	lastname: string;
	name: string;
	sub: string;
}

export interface UserRequestResult {
	status: number;
	message: string;
	userInfo?: TokenDecoded;
}
