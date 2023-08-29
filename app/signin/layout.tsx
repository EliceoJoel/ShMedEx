import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Sign in",
	description: "Page to sign in users already signed up",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
