import { Page } from "./page.model";

export interface Guide {
    id: string;
    no: number;
    title: string;
    description: string;
    pages: Promise<Page[]>;
}