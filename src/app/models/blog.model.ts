import { Content } from "./content.model";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    images: PostImage[];
    content: Content[];
    tags: string[];
    status: 'published' | 'draft';
    publish_date: Date;
    created_on: Date;
}
interface PostImage {
    type: 'file' | 'url';
    value: string;
}
