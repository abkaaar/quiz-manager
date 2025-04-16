import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Manager - Test Your Knowledge!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ModalProvider />
        <AuthProvider>
        <main>{children}</main>
        </AuthProvider>
        <Toaster position="top-center" duration={5000} richColors />
      </body>
    </html>
  );
}
