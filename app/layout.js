import "./globals.css";
import { Toaster } from "sonner";
import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${catamaran.className}
          min-h-screen
          bg-white
          text-zinc-900
          antialiased
          overflow-x-hidden
        `}
      >
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}