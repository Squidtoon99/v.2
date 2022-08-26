
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import styles from "styles/section.module.css";
import featureStyles from "styles/feature.module.css";
import { Project } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "react-feather";
import { srConfig } from "@/config";
const Features: NextPage<{ projects: Project[]; }> = ({ projects }) => {
    const reveal = useRef([]);

    useEffect(() => {
        async function animate() {
            for (let i = 0; i < reveal.current.length; i++) {
                const sr = (await import("scrollreveal")).default;
                sr(srConfig()).reveal(reveal.current[i]);
            }
        }
        animate();
    }, []);
    return <section id='projects' className={styles.section}>
        <h1 className="text-3xl font-semibold">
            Featured Projects
        </h1>
        {projects.filter(project => project.featured && project.image).map((project, index) => { // @ts-ignore
            return <section key={index} className="mb-12 pt-40 sm:mb-12 md:py-5 lg:py-4 xl:py-8 2xl:py-20" ref={el => reveal.current[index] = el}>
                <div className="container">
                    <div className="relative grid-cols-2 place-items-center items-center md:grid">
                        <div className={`relative z-1 ${index % 2 == 0 ? "order-last lg:pl-16" : "lg:pr-16 "}`}>
                            <div className="mb-1 space-y-2 sm:mb-2">
                                <div>
                                    <div aria-hidden="true">
                                    </div>
                                </div>
                                <span className={`text-[24px] ${featureStyles.title}`}>
                                    {project.title}
                                </span>
                            </div>
                            <p className="mb-2 text-[16px] text-secondary sm:mb-3 text-gray-300" dangerouslySetInnerHTML={{ __html: project.excerpt || "" }}>
                            </p>
                            <Link role="button" passHref={true} href={`/projects/${project.slug}`}><a className={`block p-1 ${featureStyles.link} ${styles.link}`}>Read more &rarr;</a></Link>
                        </div>
                        <div className="relative left-0 bottom-full h-full w-full md:relative md:bottom-auto">
                            <Image width={"25"} height={"15"} layout="responsive" alt={project.image} src={'/images/' + project.image} className={`hidden md:relative lg:relative w-full h-full object-cover ${featureStyles.image}`} />
                        </div>
                    </div>
                </div>
            </section>;
        })}
    </section>;

};
export default Features;