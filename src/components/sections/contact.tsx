import { srConfig } from "@/config";
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import styles from "styles/section.module.css";

const Contact: NextPage = () => {
    const reveal = useRef(null);

    useEffect(() => {
        async function animate() {
            if (reveal.current) {
                const sr = (await import("scrollreveal")).default;
                sr(srConfig(400, 0.5)).reveal(reveal.current);
            }
        }
        animate();
    }, []);

    return <section id='contact' className={`flex flex-col justify-center align-middle ${styles.section}`} ref={reveal}>
        <h1 className="text-4xl font-semibold text-center">
            Send me a message!
        </h1>
        <a href="mailto:arjun@squid.pink" className="text-xl rounded-md text-orange-400 border border-orange-400 hover:bg-orange-400/10 transform-all duration-500 hover:scale-110 ease-in-out w-fit font-semibold p-3 mx-auto my-3">
            Get In Touch
        </a>
    </section>;
};

export default Contact;