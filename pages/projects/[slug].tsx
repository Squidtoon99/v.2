import { getProjects } from "@/data";
import { format, parseISO } from 'date-fns';
import { Project } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import mdxPrism from "rehype-prism";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Star } from "react-feather";

const components = {
    Head,
    Image,
    Link,
};

const Project: NextPage<{ project: Project; source: MDXRemoteSerializeResult; }> = ({ project, source }) => {
    return <>
        <article>
            {project.featured && <p className="text-yellow-600 inline-flex gap-1 text-sm align-bottom font-semibold">
                <Star className="px-1" /> Featured Project
            </p>}
            <h1 className="text-3xl lg:text-6xl font-semibold pb-3 z-15 text-transparent bg-clip-text" style={{ background: "linear-gradient(135deg, rgb(14, 115, 204) 1.93%, rgb(98, 75, 187) 14.86%, rgb(255, 69, 93) 48.09%, rgb(243, 88, 21) 77.82%, rgb(242, 182, 0) 97.3%)", WebkitTextFillColor: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text" }}>
                {project.title}
            </h1>
            <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
                {format(parseISO(project.date), 'MMMM dd, yyyy')}
            </p>
            <div className="prose dark:prose-dark max-w-2xl">
                {/* @ts-ignore */}
                <MDXRemote {...source} components={components} />
            </div>
        </article>
    </>;
};

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params);
    const project = getProjects().find(project => project.slug == params?.slug);
    if (!project) {
        return {
            redirect: {
                destination: '/projects'
            }
        };
    }

    const mdxSource = await serialize(project.content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [require('remark-code-titles')],
            rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
        },
        scope: project,
    });

    return {
        props: {
            source: mdxSource,
            project: project,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getProjects()
        // Remove file extensions for page paths
        .map((project) => project.slug)
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default Project;