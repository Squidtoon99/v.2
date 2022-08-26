import { Project } from "@/interfaces";
import { NextPage } from "next";
import Link from "next/link";
import styles from "styles/section.module.css";
import { ExternalLink, GitHub, Link as ELink, FileText } from "react-feather";
import featureStyles from "styles/feature.module.css";
import { useEffect, useRef } from "react";
import { srConfig } from "@/config";

const Projects: NextPage<{ projects: Project[]; }> = ({ projects }) => {
    const revealTitle = useRef<HTMLDivElement>(null);
    const revealProjects = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        async function animate() {
            const sr = (await import("scrollreveal")).default;
            // @ts-ignore
            sr(srConfig()).reveal(revealTitle.current);
            for (let i = 0; i < revealProjects.current.length; i++) {
                const sr = (await import("scrollreveal")).default;
                revealProjects.current.forEach((ref, i) => sr(srConfig(i * 100)).reveal(ref));
            }
        }
        animate();
    }, []);
    return <section id='projects--full' className={styles.section}>
        <h1 className="text-3xl font-semibold flex" ref={revealTitle}>
            <span className="flex-grow">Projects</span>{' '}
            <Link href="/projects" passHref={true} ><a className="m-1 p-1 gap-2 text-base text-center inline-flex">View the archive <ELink /></a></Link>
        </h1>

        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.map((project, index) => {
                    // @ts-ignore
                    return <div key={index} className={styles.card} ref={el => revealProjects.current[index] = el}>
                        <div className="flex-grow">
                            {/* @ts-ignore */}
                            <span className={`text-[24px] border-none ${featureStyles.title}`}>
                                {project.title}
                            </span>
                        </div>
                        <div>
                            <div className="px-2 pb-1 pt-2 flex flex-row-reverse gap-4">
                                {project.website && <a href={project.website} className="hover:text-orange-400"> <ExternalLink /></a>}
                                {project.github && <a href={project.github} className="hover:text-orange-400"><GitHub /></a>}
                                {project.excerpt && <a href={`/projects/` + project.slug} className="hover:text-orange-400"><FileText /></a>}
                            </div>
                        </div>
                    </div>;
                }
                )}
            </div>
        </div>
    </section>;
};

export default Projects;;;