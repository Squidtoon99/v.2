import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { srConfig } from "@/config";
import Link from "next/link";
import styles from "styles/section.module.css";

const About: NextPage = () => {
    const reveal = useRef(null);

    useEffect(() => {
        async function animate() {
            if (reveal.current) {
                const sr = (await import("scrollreveal")).default;
                sr(srConfig()).reveal(reveal.current);
            }
        }
        animate();
    }, []);

    return <section id='about' className={`p-2 pt-8 max-w-xl ${styles.section}`} ref={reveal}>
        <h1 className="text-3xl font-semibold">
            About Me
        </h1>
        <p className="text-xl">
            I&apos;m an aspiring software developer with a passion for web based applications.{' '}
            I have spent the past year working on my discord bot <Link href='/projects/friskytool' passHref={true}><a className={styles.link}>Friskytool</a></Link>.{' '}
            I also make websites and try to work on a new project every few months.{' '}
            In my free time I enjoy playing frisbee 🥏, playing the saxophone 🎷, and going hiking 🥾.
        </p>
    </section>;
};

export default About;