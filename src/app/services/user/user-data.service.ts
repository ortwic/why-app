import { Injectable } from '@angular/core';
import { UserStorage, UserDataRecord, UserDataItems, RecordKey, SetKey } from '../../models/user-data.model';

type StorageKey = string;
export const DEFAULT_KEY: StorageKey = '8133553D-570A7-F-N0U5-42';
/**
 * Bonus point for reading the page at least 5 minutes.
 */
export const PAGE_READ_TIME = '__page-read-in';
/**
 * Total bonus points e. g. reading the page at least 5 minutes.
 */
export const TOTAL_BONUS_POINTS = 1;

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
export class UserDataService<T = unknown> {
    private readonly _userData: Record<string, UserStorage<T>> = {};

    /** Loads data from localStorage for the given key. */
    private load(key: StorageKey): UserStorage<T> {
        try {
            return JSON.parse(localStorage.getItem(key) ?? '{}');
        } catch {
            return {};
        }
    }

    /** Returns all user data for the given storage key (lazy-loaded). */
    storage(key = DEFAULT_KEY): UserStorage<T> {
        return this._userData[key] ??= this.load(key);
    }

    /** Returns a specific record by RecordKey. */
    getRecord(key: RecordKey, storageKey = DEFAULT_KEY): UserDataRecord<T> {
        const store = this.storage(storageKey);
        return store[key] ?? {};
    }

    /** Returns all items within a specific item group. */
    getItems(setKey: SetKey, recordKey: RecordKey = 0, storageKey = DEFAULT_KEY): UserDataItems<T> {
        const record = this.getRecord(recordKey, storageKey);
        return record[setKey] ?? {};
    }

    /** Merges and saves updated items into the specified group and record. */
    saveItems(keys: [SetKey, RecordKey], newItems: UserDataItems<T>, storageKey = DEFAULT_KEY) {
        const key = keys[0];
        const unit = keys[1];
        const storage = this.storage(storageKey);
        const items = this.getItems(key, unit, storageKey);
        this._userData[storageKey][unit] = {
            ...storage[unit],
            [key]: {
                ...items,
                ...newItems
            }
        };
        localStorage.setItem(storageKey, JSON.stringify(this._userData[storageKey]));
    }

    /** Clears all cached and persisted user data. */
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
