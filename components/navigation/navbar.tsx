"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between font-body">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="sr-only">Vivin Digital</span>
            {/* UNCOMMENT THIS DIV */}
            <div className="relative h-[7rem] w-40">
              <Image
                src="/images/logo.png"
                alt="Vivin Digital"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* UNCOMMENT THIS DIV */}
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-accent2"
                  : "text-white hover:text-accent2"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 bg-accent2 text-white font-medium rounded-lg hover:bg-accent2/80 transition-colors"
          >
            Get Your Free Strategy
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-blue-50 text-accent1"
                    : "text-gray-700 hover:bg-gray-50 hover:text-accent1"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Your Free Strategy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
