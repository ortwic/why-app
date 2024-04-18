import { Injectable } from '@angular/core';

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

type UserData<TValue> = Record<string, UserDataEntry<TValue>>;
type UserDataEntry<TValue> = Record<string, TValue>;

@Injectable({
    providedIn: 'root',
})
export class UserDataService<TValue = unknown> {
    private readonly _userData: Record<string, UserData<TValue>> = {};

    private load(storageKey: string): UserData<TValue> {
        const data = localStorage.getItem(storageKey);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error(e);
            }
        }
        return {};
    }

    getData(storageKey = defaultKey): UserData<TValue> {
        if (!this._userData[storageKey]) {
            this._userData[storageKey] = this.load(storageKey);
        }
        return this._userData[storageKey];
    }

    getEntry(id: number | string, storageKey = defaultKey): UserDataEntry<TValue> {
        const data = this.getData(storageKey);
        if (typeof id === 'number') {
            return Object.values(data)[id] ?? {};
        }
        return data[id] ?? {};
    }

    save(id: number | string, data: UserDataEntry<TValue>, storageKey = defaultKey) {
        const obj = this.getData(storageKey);
        this._userData[storageKey] = {
            ...obj,
            [id]: {
                ...obj[id],
                ...data,
            },
        };
        localStorage.setItem(storageKey, JSON.stringify(this._userData[storageKey]));
    }

    clear() {
        Object.keys(this._userData).forEach((key) => {
           this._userData[key] = {};
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
