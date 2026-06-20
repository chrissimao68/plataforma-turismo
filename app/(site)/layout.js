import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function SiteLayout({ children }) {
  return (
    <div className={catamaran.className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}