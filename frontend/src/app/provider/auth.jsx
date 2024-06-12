"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Auth = ({ children }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  console.log("session", session);
  console.log("status", status);
  console.log("pathname", pathname);

  useEffect(() => {
    if (!session) {
      if(pathname !== "/pages/register") {
        router.push("/pages/login");
      }
    } else if ( session) {
      router.push("/pages/home");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );
  }
  if(pathname === "/pages/register") {
    return children
  }
  if (pathname === "/pages/login" && status === "authenticated") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );
  }
  if (pathname !== "/pages/login" && status === "unauthenticated") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  return children;
};
export default Auth;
