import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "sonner";
import { ORIGIN_URL } from "@/utils/helper";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapSumm AI",
  description: "SnapSumm AI - Effortless PDF Summarization",
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${fontSans.variable} fontSans antialiased`}
        >
          
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          <Toaster richColors/>
        </body>
      </html>
    </AuthProvider>
  );
}
