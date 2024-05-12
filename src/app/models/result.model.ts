import { InputValue } from "./content.model";
import { UserDataItems } from "./user-data.model";

export type ResultValue = Result | Progress | UserDataItems<InputValue> | undefined;

export interface Result {
    [key: string]: ResultValue;
    data?: UserDataItems<InputValue>;
    progress: Progress;
}

export interface Progress {
    count: number;
    total: number;
    percent: number;
}