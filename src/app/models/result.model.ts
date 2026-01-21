import { InputValue } from "./content.model";
import { UserDataItems } from "./user-data.model";

export type UnitResults = Record<string, PageResults> & { progress: Progress };

export interface PageResults extends Record<string, ResultUnion> {
    items?: UserDataItems<InputValue>;
    progress: Progress;
}

export type ResultUnion = PageResults | Progress | UserDataItems<InputValue> | undefined;

export interface Progress {
    count: number;
    total: number;
    percent: number;
}

export function isProgress(key: string, obj: Progress): key is Exclude<keyof ResultUnion, keyof Progress> {
  return key === 'progress' && 'percent' in obj && 'count' in obj && 'total' in obj;
}