import { Page } from "./page.model";

export interface Unit {
    id: string;
    order: number;
    title: string;
    caption: string;
    description: string;
    pages: Promise<Page[]>;
}