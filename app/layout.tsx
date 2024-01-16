/* eslint-disable linebreak-style */
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "SHMEDEX",
	description: "Share your recovery medical experiences",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				{children}
				<Toaster position="bottom-center" richColors />
			</body>
		</html>
	);
}
