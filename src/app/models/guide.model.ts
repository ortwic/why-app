import { Unit } from "./unit.model";

export interface Guide {
    id: string;
    lang: string;
    order: number;
    title: string;
    domain: string;
    caption: string;
    overview: string;
    description: string;
}