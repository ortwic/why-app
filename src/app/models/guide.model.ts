import { StartContent } from "./page.model";

export interface Guide {
    id: string;
    lang: string;
    order: number;
    title: string;
    domain: string;
    caption: string;
    content: StartContent[];
    description: string;
}