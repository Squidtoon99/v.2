import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useScrollDirection } from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

type HomeType = {
    isHome: boolean;
};

const links = {
    home: {
        href: "/",
        label: "Home",
    },
    about: {
        href: "/#about",
        label: "About",
    },
    projects: {
        href: "/#projects",
        label: "Projects",
    },
    contact: {
        href: "/#contact",
        label: "Contact",
    },
};

const NavBar: NextPage<HomeType> = ({ isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome);
    // @ts-ignore
    const scrollDirection = useScrollDirection('down');
    const [scrolledToTop, setScrolledToTop] = useState(true);

    const { asPath } = useRouter();

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let i = 0;
    const navLinks = Object.keys(links).map((key) => {
        // @ts-ignore
        const { href, label } = links[key];
        return (
            <Link href={href} key={key}>
                <a className={`p-1 inline-block hover:text-orange-400 underline-offset-8 ${asPath == href ? 'underline' : ''} decoration-orange-400 hover:-translate-y-1 transform-all duration-300 ease-in-out rounded-md nav-link ${scrollDirection === 'down' ? 'animate-slide-up-out' : 'animate-slide-down-in'}`} style={{ animationFillMode: "both", animationDelay: `${i++ * 100}ms` }}>{label}</a>
            </Link>
        );
    });
    return <nav className="flex z-10 bg-background/5 fixed top-0 right-0 w-full mr-10 items-end justify-end gap-4 flex-wrap p-2 transition-all duration-300 ease-in-out">
        <div className="items-center justify-between hidden lg:flex md:flex">
            <ul className="flex items-center lg:gap-4 md:gap-3 gap-2 text-blue-100">
                {navLinks}
            </ul>
        </div>
        {isMounted && <div className="flex items-center justify-between lg:hidden md:hidden">
            <div className="flex items-center">
                <ul className="flex items-center">
                    {navLinks}
                </ul>
            </div>
        </div>}
    </nav>;
};

export default NavBar;