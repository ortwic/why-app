import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export const localKey = 'user-data';
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
export class UserDataService<T = unknown> {
    readonly platformId = inject(PLATFORM_ID);
    readonly userData = signal(this.load());

    private load(): Record<string, Record<string, T>> {
        if (isPlatformBrowser(this.platformId)) {
            const data = localStorage.getItem(localKey);
            if (data) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return {};
    }

    getEntry(id: number | string): Record<string, T> {
        return this.userData()[id] ?? {};
    }

    save(id: number | string, data: Record<string, T>) {
        if (isPlatformBrowser(this.platformId)) {
            this.userData.update((obj) => ({
                ...obj,
                [id]: {
                    ...obj[id],
                    ...data,
                },
            }));
            localStorage.setItem(localKey, JSON.stringify(this.userData()));
        } else {
            console.warn(`Cannot save ${id} in server`);
        }
    }

    clear() {
        if (isPlatformBrowser(this.platformId)) {
            this.userData.set({});
            localStorage.removeItem(localKey);
        }
    }

    download() {
        const data = this.userData();
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
