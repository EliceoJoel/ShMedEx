export interface ISignIn {
	email: string;
	password: string;
}

export interface ISignUp {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface NewPost {
	post: string;
	image: FileList | undefined;
}
