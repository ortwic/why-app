import { Page } from "./page.model";
import { UnitResults } from "./result.model";

export interface Unit {
    id: string;
    order: number;
    title: string;
    caption: string;
    description: string;
}

export interface UnitView extends Unit {
    pages: Page[];
    results?: UnitResults;
}