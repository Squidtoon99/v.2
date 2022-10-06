import { srConfig } from "@/config";
import { getProjects } from "@/data";
import { Project } from "@/interfaces";
import { format, parseISO } from "date-fns";
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { ExternalLink, FileText, GitHub } from "react-feather";

const Projects: NextPage<{ projects: Project[]; }> = ({ projects }) => {
    const revealHead = useRef<any>(null);
    const revealProjects = useRef<any[]>([]);

    useEffect(() => {
        async function animate() {
            const sr = (await import("scrollreveal")).default;
            // @ts-ignore
            sr(srConfig(250)).reveal(revealHead.current);
            console.log(revealProjects.current);
            for (let i = 0; i < revealProjects.current.length; i++) {
                console.log(revealProjects.current[i]);
                const sr = (await import("scrollreveal")).default;
                revealProjects.current.forEach((ref, i) => sr(srConfig(200 + (i < 10 ? i * 100 : 1000))).reveal(ref));
            }
        }
        animate();
    }, []);

    return (
        <section id="projects" className="flex flex-col" >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold flex m">
                <span className="flex-grow">Archive</span>
            </h1>

            <table className="justify-start rounded-xl overflow-hidden bg-gradient-to-r from-orange-50/0 to-teal-50/0 p-10 my-3 max-w-56 gap-2" style={{ textAlignLast: "start" }}>
                <thead ref={revealHead}>
                    <tr>
                        <th className="pr-2 py-2 text-blue-100/80">Year</th>
                        <th className=" py-2 text-blue-100/80">Title</th>
                        <th className=" py-2 text-blue-100/80">Built With</th>
                        <th className=" py-2 hidden md:block lg:block text-blue-100/80">Links</th>
                    </tr>
                </thead>
                <tbody className="">
                    {projects.map((project, index) => {
                        return (
                            <tr key={index} ref={el => revealProjects.current[index] = el} className="hover:bg-blue-200/10 transition-colors duration-300 ease-linear">
                                <td className="border-none pr-4 py-2 text-orange-400/90 font-medium">{format(parseISO(project.date), "yyyy")}</td>
                                <td className="odd:bg-orange-500/70 border-none pr-2 py-2 text-blue-100 font-medium">{project.title}</td>
                                <td className="border-none pr-2 py-2 text-blue-100 font-medium hidden lg:block md:block max-w-md">{project.tags.map((tag) => {
                                    return <span key={tag} className="inline-block text-blue-100/90 text-sm  py-1 rounded-full">{tag}</span>;
                                }).reduce((a, b) => {
                                    return <> {a} <span key={1} className="mx-[0.1]" >·</span> {b} </>;
                                })}</td>
                                <td className="border-none pr-2 py-2 text-blue-100 font-medium">
                                    <div className="flex align-middle gap-1">
                                        {project.website && <a href={project.website} className="flex justify-center flex-shrink-0 hover:text-orange-400/90"> <ExternalLink /></a>}
                                        {project.github && <a href={project.github} className="inline-block hover:text-orange-400/90"><GitHub /></a>}
                                        {project.excerpt && <a href={`/projects/` + project.slug} className="inline-block hover:text-orange-400/90"><FileText /></a>}
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                )}
                </tbody>
            </table>
        </section >
    );
};

export function getServerSideProps() {
    const projects = getProjects();
    return {
        props: { projects },
    };
}

export default Projects;;;