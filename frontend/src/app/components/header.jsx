"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from '../../../public/images/logo.jpg'

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (!session && !session?.user) {
      router.push("/pages/login");
    }
  }, [session]);

  return (
    <nav className=" border-b-2 border-neutral-200 flex-no-wrap relative flex w-full items-center justify-between py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
    
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
        >
          <a
            className="mb-4 me-5 ms-2 mt-3 flex items-center lg:mb-0 lg:mt-0"
            href="#"
          >
            <Image
              src={Logo}
              width={50}
              height={50}
              alt=""
            />
          </a>
          <ul
            className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
            data-twe-navbar-nav-ref
          >
            <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
              <a
                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                href="#"
                data-twe-nav-link-ref
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        <div className="relative flex items-center">
          <div
            className="relative">
              <img
              src={session?.user.image}
              className="rounded-full"
                style={{ height: "25px", width: "25px" }}
                alt=""
                loading="lazy"
              />
          
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
export default Header;
