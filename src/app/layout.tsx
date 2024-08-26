import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `Cek Formasi CPNS ${new Date().getFullYear()}`,
    description: `Cek formasi CPNS tahun ${new Date().getFullYear()} dengan mudah`,
    icons: {
        icon: "/favicon.jpg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
