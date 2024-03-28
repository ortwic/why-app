import { IFrameContent, MarkdownContent, SectionContent, SliderContent, FormContent } from "./content.model";

export interface Page {
    id: string;
    title: string;
    slug: string;
    hero_section: HeroSection,
    content: PageContent[];
    sidebar?: {
        title: string;
        content: string;
    },
    seo_metadata?: {
        meta_title: string;
        meta_description: string;
        focus_keywords: string;
    },
    footer_override: string;
    publish_date: Date;
    last_updated: Date;
    status: 'published' | 'beta' | 'draft';
    min_read_time: number;
}

export interface HeroSection {
    headline: string;
    subhead: string;
    call_to_action: string;
    call_to_action_link: string;
    image_info: string;
    image: string;
}

export type PageContent = MarkdownContent 
                        | FormContent
                        | IFrameContent 
                        | SectionContent
                        | SliderContent;