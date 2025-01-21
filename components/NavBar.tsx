'use client'
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const NavBar = ({ scrollOffset = 400 }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = () => {
        const offset = 200; // Adjust this value to set the scroll distance
        setIsSticky(window.scrollY > offset);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header ref={headerRef} className="py-4 px-8 w-full min-h-[100px] bg-white z-50 shadow-md">
                <nav className="flex justify-between items-center w-full lg:w-2/3 mx-auto">
                    <Link href="/" className="mr-5">
                        <Image src="/logo.png" alt="Logo" width={225} height={75} />
                    </Link>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-black">
                            {isMenuOpen ? <></> : <Menu size={24} />}
                        </button>
                    </div>
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link href="/ounces" className="text-xl links">
                            Ounces
                        </Link>
                        <Link href="/eighths" className="text-xl links">
                            Eighths
                        </Link>
                        <Link href="/vapes" className="text-xl links">
                            Pens
                        </Link>
                        <Link href="/edibles" className="text-xl links">
                            Edibles
                        </Link>
                        <Link href="/pre-rolls" className="text-xl links">
                            Pre-Rolls
                        </Link>
                        <Link href="/blog" className="text-xl links">
                            Blog
                        </Link>
                        <Search size={24} />
                    </div>
                </nav>
            </header>
            <div
                className={`fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-300 ease-in-out ${
                    isSticky ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <header className="py-4 px-8 w-full min-h-[75px]">
                    <nav className="flex justify-between items-center w-full lg:w-2/3 mx-auto">
                        <Link href="/" className="mr-5">
                            <Image src="/logo.png" alt="Logo" width={225} height={75} />
                        </Link>
                        <div className="lg:hidden">
                            <button onClick={toggleMenu} className="text-black">
                                {isMenuOpen ? <></> : <Menu size={24} />}
                            </button>
                        </div>
                        <div className="hidden lg:flex items-center space-x-6">
                            <Link href="/ounces" className="text-xl links">
                                Ounces
                            </Link>
                            <Link href="/eighths" className="text-xl links">
                                Eighths
                            </Link>
                            <Link href="/vapes" className="text-xl links">
                                Pens
                            </Link>
                            <Link href="/edibles" className="text-xl links">
                                Edibles
                            </Link>
                            <Link href="/pre-rolls" className="text-xl links">
                                Pre-Rolls
                            </Link>
                            <Link href="/blog" className="text-xl links">
                                Blog
                            </Link>
                            <Search size={24} />
                        </div>
                    </nav>
                </header>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
            )}
            <div
                className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 transform ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                <div className="flex justify-between items-center p-4">
                    <Link href="/" className="mr-5">
                        <Image src="/logo.png" alt="Logo" width={225} height={75} />
                    </Link>
                    <button onClick={toggleMenu} className="text-black">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <Link href="/ounces" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Ounces
                    </Link>
                    <Link href="/eighths" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Eighths
                    </Link>
                    <Link href="/vapes" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Pens
                    </Link>
                    <Link href="/edibles" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Edibles
                    </Link>
                    <Link href="/pre-rolls" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Pre-Rolls
                    </Link>
                    <Link href="/blog" className="mb-5 text-xl links" onClick={toggleMenu}>
                        Blog
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NavBar