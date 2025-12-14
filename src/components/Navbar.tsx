"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Navbar */}
            <header className=" bg-white shadow">
                <nav className="max-w-4xl mx-auto p-4 text-gray-800  px-4 py-3 flex items-center justify-between sticky top-0 w-full z-50">
                    {/* Logo / Brand */}
                    <Link href={"/"} className="text-lg font-bold">MyBrand</Link>

                    {/* Menu Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </nav>
            </header>



            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 opacity-70 z-10 transition-all"
                    onClick={toggleMenu}
                />
            )}

            {/* Right Side Sliding Menu */}
            <div className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-20 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="flex flex-col mt-16 px-4">
                    <Link href="/" className="py-3 text-gray-800 hover:text-black border-b border-gray-200" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="/shop" className="py-3 text-gray-800 hover:text-black border-b border-gray-200" onClick={() => setIsOpen(false)}>
                        Shop
                    </Link>
                    <Link href="/categories" className="py-3 text-gray-800 hover:text-black border-b border-gray-200" onClick={() => setIsOpen(false)}>
                        Categories
                    </Link>
                </div>
            </div>
        </>
    );
}
