import { Injectable } from '@angular/core';
import { UserDataArray, UserDataRecord, UserDataItems, UserDataItemSet } from '../../models/user-data.model';

export const defaultKey = 'default';
export const pageReadTime = '__page-read-in';

function startDownload(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

@Injectable({
    providedIn: 'root',
})
export class UserDataService<TValue = unknown> {
    private readonly _userData: Record<string, UserDataArray<TValue>> = {};

    private load(storageKey: string): UserDataArray<TValue> {
        const data = localStorage.getItem(storageKey);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error(e);
            }
        }
        return [];
    }

    getAll(storageKey = defaultKey): UserDataArray<TValue> {
        if (!this._userData[storageKey]) {
            this._userData[storageKey] = this.load(storageKey);
        }
        return this._userData[storageKey];
    }

    getRecord(recordIndex: number, storageKey = defaultKey): UserDataRecord<TValue> {
        const array = this.getAll(storageKey);
        return array[recordIndex] ?? {};
    }

    getItems(setId: string, recordIndex = 0, storageKey = defaultKey): UserDataItems<TValue> {
        const record = this.getRecord(recordIndex, storageKey);
        return record[setId] ?? {};
    }

    saveItems(id: [string, number?], newItems: UserDataItems<TValue>, storageKey = defaultKey) {
        const setId = id[0];
        const index = id[1] ?? 0;
        const array = this.getAll(storageKey);
        const items = this.getItems(setId, index, storageKey);
        this._userData[storageKey][index] = {
            ...array[index],
            [setId]: {
                ...items,
                ...newItems
            }
        };
        localStorage.setItem(storageKey, JSON.stringify(this._userData[storageKey]));
    }

    clear() {
        Object.keys(this._userData).forEach((key) => {
           this._userData[key] = [];
           localStorage.removeItem(key);
        });
    }

    download() {
        const data = this._userData;
        if (data) {
            const json = JSON.stringify(data);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            startDownload(url, 'user-data.json');
        } else {
            console.info('No data to download');
        }
    }
}
