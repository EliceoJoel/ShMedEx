import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "User Profile",
	description: "Page that display user information and their posts",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
