import { IFrameContent, MarkdownContent, SectionContent, SliderContent, FormContent, ExpandContent, InputValue } from "./content.model";
import { UserDataItems } from "./user-data.model";

export interface Page {
    id: string;
    title: string;
    hero_section: HeroSection,
    content: PageContent[];
    min_read_time: number;
    publish_date: Date;
    last_updated: Date;
    status: 'published' | 'draft';
    footer_override: string;
}

export interface PageView extends Page {
    sectionCount: number;
    guideId?: string;
    unitIndex?: number;
    prevIndex?: number;
    nextIndex?: number;
    userData: UserDataItems<InputValue>;
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
                        | ExpandContent
                        | FormContent
                        | IFrameContent 
                        | SectionContent
                        | SliderContent;