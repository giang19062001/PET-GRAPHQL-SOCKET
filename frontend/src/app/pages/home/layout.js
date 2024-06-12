import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet zone",
  description: "Pet zone",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
