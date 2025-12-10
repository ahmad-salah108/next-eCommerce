"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getFontClassName } from "@/lib/utils";

export default function Navbar({ locale }: { locale: string }) {
  const search = useRef<HTMLInputElement | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const t = useTranslations();
  // const tAuth = useTranslations("Auth");
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(`/${locale}`, "");

  // Navigation items array
  const NAVITEMS = [
    { name: "home", href: "/" },
    { name: "services", href: "/services" },
    { name: "my_orders", href: "/my-orders" },
    { name: "contact_us", href: "/contact-us" },
    { name: "about", href: "/about" },
  ];

  return (
    <div>
      <nav className=" mx-auto bg-white border-b border-warm-gray shadow-[0_0_5px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto tracking-wide">
          <div className="flex items-center justify-between py-4">
            {/* Menu Button & Logo */}
            {!isMobileSearchOpen && (
              <div className="flex justify-center items-center gap-6">
                <div className="lg:hidden flex justify-center items-center">
                  <button
                    className="flex justify-center items-center cursor-pointer relative ml-auto select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none translate-y-0.5"
                    onClick={toggleMobileMenu}
                    type="button"
                  >
                    <Image
                      src={"/assets/icons/menu.svg"}
                      alt="menu icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                <Link href="/" aria-label="Website logo" className="me-4 block cursor-pointer">
                  <p
                    className={`${getFontClassName(
                      locale
                    )} font-black text-2xl lg:text-3xl`}
                  >
                    SHOP.CO
                  </p>
                </Link>
              </div>
            )}

            {/* Desktop Menu */}
            <div className={`hidden lg:block`}>
              <NavigationMenu>
                <NavigationMenuList className="gap-2 **:text-[1rem]">
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild>
                      <Link href="/">Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>List</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="#">
                              <div className="font-medium">Components</div>
                              <div className="text-muted-foreground">
                                Browse all components in the library.
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="#">
                              <div className="font-medium">Documentation</div>
                              <div className="text-muted-foreground">
                                Learn how to use the library.
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="#">
                              <div className="font-medium">Blog</div>
                              <div className="text-muted-foreground">
                                Read our latest blog posts.
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild>
                      <Link href="/docs">Documentation</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild>
                      <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div
              className={`${
                !isMobileSearchOpen && "hidden"
              } lg:block w-full lg:w-[250px] 2xl:w-[500px] transition ease-out duration-300`}
            >
              <label className="flex gap-3 rounded-full bg-gray-150 py-2.5 px-4 text-[14px] transition ease-out duration-300">
                <Image
                  src="/assets/icons/search.svg"
                  alt="search icon"
                  width={20}
                  height={20}
                  aria-hidden
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="border-none outline-none transition ease-out duration-300"
                  ref={search}
                  style={{ width: "100%" }}
                />
                {isMobileSearchOpen && (
                  <span
                    className="text-[14px] text-gray-700"
                    onClick={() => setIsMobileSearchOpen(false)}
                  >
                    Cancel
                  </span>
                )}
              </label>
            </div>

            {!isMobileSearchOpen && (
              <div className="gap-3 flex tracking-wider justify-center items-center">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full cursor-pointer flex lg:hidden"
                  onClick={() => {
                    setIsMobileSearchOpen(true);
                    setTimeout(() => {
                      (search.current as HTMLInputElement).focus();
                    }, 0);
                  }}
                >
                  <Image
                    src="/assets/icons/search-mobile.svg"
                    alt="search icon"
                    width={20}
                    height={20}
                  />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full cursor-pointer"
                  aria-label="My Cart"
                  asChild
                >
                  <Link href={"/cart"}>
                    <Image
                      src="/assets/icons/cart.svg"
                      alt="cart icon"
                      width={20}
                      height={20}
                    />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full cursor-pointer"
                >
                  <Image
                    src="/assets/icons/profile.svg"
                    alt="profile icon"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile black overlay when drawer is open*/}
      {isMobileMenuOpen && (
        <div
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-35 bg-black/50 lg:hidden"
        ></div>
      )}
      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 min-h-screen w-70 bg-background shadow-lg transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-row items-center border-b pb-4 px-5 bg-linear-to-r from-main-400 to-main text-white">
          <div className={`flex flex-col`}>
            <Link href="/" className="cursor-pointer pt-4">
              <div className="w-[70px] h-[70px] bg-white rounded-full flex justify-center items-center">
                <Image
                  src={"/assets/logo.svg"}
                  width={90}
                  height={90}
                  alt="Fenzo Logo"
                />
              </div>
            </Link>
            <strong className="tracking-wider text-2xl pt-5 font-medium">
              John Doe
            </strong>
            <sub className="tracking-wider text-lg font-light -translate-y-1">
              Event Planner
            </sub>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="cursor-pointer absolute top-4 right-4 text-background"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-full gap-4 p-4">
          {NAVITEMS.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathWithoutLocale === "" || pathWithoutLocale === "/"
                : pathWithoutLocale.startsWith(item.href);
            return (
              <li
                key={index}
                className={`flex items-center p-1 gap-x-2 tracking-wide`}
              >
                <Link
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  href={item.href}
                  className={`flex items-center ${
                    isActive ? `active-nav-link` : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <hr className="border-gray-300 my-3" />
          <li className={`flex items-center p-1 gap-x-2 tracking-wide`}>
            <Link href={"/login"}>{"login"}</Link>
          </li>
          <li className={`flex items-center p-1 gap-x-2 tracking-wide`}>
            <Link href={"/register"}>{"register"}</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
