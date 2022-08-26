import { NextPage } from "next";
import { GitHub, Youtube, Instagram, Codepen } from "react-feather";
import styles from 'styles/sidebar.module.css';

const SideBar: NextPage<{ isHome: boolean; }> = ({ isHome }) => {
    const logos = [
        { Logo: GitHub, url: "https://github.com/Squidtoon99" },
        { Logo: Youtube, url: "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ" },
        { Logo: Instagram, url: "https://www.instagram.com/arjun_nayak9/" },
        { Logo: Codepen, url: "/mail" }
    ].reverse();

    const delay = isHome ? 1350 : 200;
    return <>
        <div className="hidden fixed bottom-0 left-0 h-screen w-16 md:flex lg:flex flex-col-reverse items-center text-white gap-4 m-2">
            <div className={`w-1 h-32 bg-blue-100/80 rounded-full ${isHome ? 'animate-slide-right' : ''} motion-reduce:animate-none`} style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }} />
            {logos.map(({ Logo, url }, index) => {
                return <a href={url} key={index}>
                    <Logo className={`${styles.logo} text-blue-100 hover:-translate-y-1 hover:text-orange-400 transform-all duration-500 ease-in-out ${isHome ? 'animate-spin-in' : ''}`} style={{ animationDelay: `${index * 150 + delay}ms`, animationFillMode: "backwards" }} />
                </a>;
            })}
        </div>
        <div className="hidden fixed bottom-0 right-0 h-screen w-8 md:flex lg:flex flex-col items-center text-blue-100/75 m-2 gap-4">
            <div className={`w-1 h-32 bg-blue-100/80 rounded-full ${isHome ? 'animate-slide-left' : ''} motion-reduce:animate-none`} style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }} />
            <a href="mailto:arjun@squid.pink" className={`hover:text-orange-400 ${styles.email}`}>
                {'arjun@squid.pink'.split('').map((letter, index) => {
                    return <span className="animate-slide-left inline-block" style={{ animationDelay: `${index * 45 + delay}ms`, animationFillMode: "backwards" }} key={index}>{letter}</span>;
                })}
            </a>
        </div>
    </>;
};

export default SideBar;