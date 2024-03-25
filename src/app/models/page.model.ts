import { IFrameContent, MarkdownContent, QuoteContent, SectionContent, SliderContent, FormStepperContent } from "./content.model";

export interface Page {
    id: string;
    title: string;
    slug: string;
    hero_section: HeroSection,
    content: PageContent[];
    sidebar: {
        title: string;
        content: string;
    },
    seo_metadata: {
        meta_title: string;
        meta_description: string;
        focus_keywords: string;
    },
    footer_override: string;
    publish_date: Date;
    last_updated: Date;
    is_published: boolean;
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
                        | FormStepperContent
                        | IFrameContent 
                        | SectionContent
                        | SliderContent;