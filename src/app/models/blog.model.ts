import { IFrameContent, ImagesContent, MarkdownContent, QuoteContent } from "./content.model";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    images: PostImage[];
    content: BlogContent[];
    tags: string[];
    status: 'published' | 'draft';
    publish_date: Date;
    created_on: Date;
}

type BlogContent = MarkdownContent 
                 | QuoteContent 
                 | IFrameContent 
                 | ImagesContent;

interface PostImage {
    type: 'file' | 'url';
    value: string;
}
