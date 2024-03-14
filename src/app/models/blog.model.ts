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

export type Content = MarkupContent | QuoteContent | IFrameContent | ImagesContent;

interface MarkupContent {
    type: 'text';
    value: string;
}

interface QuoteContent {
    type: 'quote';
    value: {
        text: string;
        cite: string;
    };
}

interface IFrameContent {
    type: 'iframe';
    value: {
        src: string;
        title: string;
    };
}

interface ImagesContent {
    type: 'images';
    value: string[];
}