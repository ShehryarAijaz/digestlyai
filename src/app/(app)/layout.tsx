import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        <Navbar />
        {children}
        <Toaster />
        </>
  );
}
