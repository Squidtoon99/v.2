import { ReactNode, useEffect } from 'react';
import { Sidebar, Navbar, Footer } from '@/components';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
            <main className="min-h-[85vh] lg:mt-16 mt-12 w-5/6 md:w-4/5 lg:w-4/5 m-auto">{children}</main>
            <Footer />
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="A portfolio about web development, programming, and tech." />
                <meta name="keywords" content="portfolio, arjun, nayak, development, coding" />
                <meta name="author" content="Arjun Nayak" />
                {/* Analytics */}
                <script defer data-domain="squid.pink" src="https://plausible.io/js/plausible.js"></script>
            </Head>
        </div>
    );
};

export default Layout;