import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--f-body" });
const displayFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });

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
        className={`${bodyFont.variable} ${displayFont.variable} flex min-h-screen flex-col bg-base-100 text-base-content`}
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