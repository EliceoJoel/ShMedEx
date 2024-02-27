import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign up",
	description: "Page to register new users",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
