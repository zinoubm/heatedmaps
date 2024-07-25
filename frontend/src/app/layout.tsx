import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "sonner";

import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeatedMaps",
  description: "Analyse User Behavior With Heat Maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            {children}
          </GoogleOAuthProvider>
        </ThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
