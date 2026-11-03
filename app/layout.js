import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "StudioSpace | Rent Creative Studios",
  description:
    "StudioSpace is a peer-to-peer marketplace for photographers, filmmakers, podcasters and musicians to discover and book creative studios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="studiolight" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${poppins.className} flex min-h-screen flex-col bg-base-100 text-base-content`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}