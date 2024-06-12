import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import SessionProviders from "./provider/session";
import { ApolloWrapper } from "./apollo/apolloProvider";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "./styles/background.scss";
import Auth from "./provider/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet zone",
  description: "Pet zone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true} >
          <SessionProviders>
            <ApolloWrapper>
              <ToastContainer />
              <Auth>
              {children}

              </Auth>
            </ApolloWrapper>
          </SessionProviders>
        </body>
    </html>
  );
}
