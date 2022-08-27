import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/interfaces';

const footer = `\n\n\n<Link href="/projects"><a class="text-gray-400 block mt-16 p-1 text-xl">&larr; Projects</a></Link>`;

const projectsDirectory = path.join(process.cwd(), 'public/projects');

export function getProjectNames() {
    return fs.readdirSync(projectsDirectory);
}

export function getProjects() {
    // Get file names under /projects
    const projectNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = projectNames.map((fileName) => {
        // Read markdown file as string
        // get the markdown file content
        const fullPath = path.join(projectsDirectory, fileName, 'index.md');
        // Use gray-matter to parse the post metadata section
        const matterResult = matter.read(fullPath, {
            excerpt: true
        });


        if (matterResult.data.image && matterResult.excerpt) {
            matterResult.data.excerpt = matterResult.excerpt;
            matterResult.data.featured = true;
        } else {
            matterResult.data.featured = matterResult.data.featured || false;
        }
        matterResult.data.tags = matterResult.data.tags || [];
        // Combine the data with the name
        return {
            name: fileName,
            ...(matterResult.data as Project),
            // overwriting data:
            slug: matterResult.data.title.toLowerCase().replace(/ /g, '-'),
            content: matterResult.content + '\n' + footer,
        };
    });
    // Sort projects by date
    return allProjectsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getProject(name: string) {
    const projects = getProjects();
    return projects.find((project) => project.name === name);
}

export function getProjectImage({ name, image }: { name: string; image: string; }) {
    return path.join(projectsDirectory, name, image);
}