import { ReactNode, useEffect } from 'react';
import { Sidebar, Navbar, Footer } from '@/components';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: ReactNode; }) => {

    const { pathname } = useRouter();

    let isHome: boolean;
    if (pathname === '/') {
        isHome = true;
    } else {
        isHome = false;
    }

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 100);
        }
    });

    return (
        <div className="flex">
            <Navbar isHome={isHome} />
            <Sidebar isHome={isHome} />
            <main className="min-h-[100vh] lg:mt-16 mt-12 w-5/6 md:w-4/5 lg:w-4/5 m-auto">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;