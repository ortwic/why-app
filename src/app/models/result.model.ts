import { InputValue } from "./content.model";

export type ResultValue = Result | Progress | Record<string, InputValue> | undefined;

export interface Result {
    [key: string]: ResultValue;
    data?: Record<string, InputValue>;
    progress: Progress;
}

export interface Progress {
    count: number;
    total: number;
    percent: number;
}