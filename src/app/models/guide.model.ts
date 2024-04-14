import { Unit } from "./unit.model";

export interface Guide {
    id: string;
    order: number;
    title: string;
    caption: string;
    description: string;
    units: Promise<Unit[]>;
}