import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
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