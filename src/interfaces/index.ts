export interface Project {
    title: string;
    slug: string;
    date: string;
    image: string;
    content: string;
    tags: string[];
    featured?: boolean;
    excerpt?: string;
    github?: string;
    website?: string;
};