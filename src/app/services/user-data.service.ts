import { Injectable, Signal, computed, signal } from '@angular/core';

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
    readonly userData = signal(this.load());

    private load(): Record<string, Record<string, T>> {
      const data = localStorage.getItem(localKey);
      if (data) {
          try {
              return JSON.parse(data);
          } catch (e) {
              console.error(e);
          }
      }
      return {};
    }

    getEntry(id: number | string): Record<string, T> {
        return this.userData()[id] ?? {};
    }

    save(id: number | string, data: Record<string, T>) {
        this.userData.update(obj => ({ 
            ...obj, 
            [id]: {
                ...obj[id],
                ...data
            }
        }));
        localStorage.setItem(localKey, JSON.stringify(this.userData()));
    }

    clear() {
        this.userData.set({});
        localStorage.removeItem(localKey);
    }

    download() {
        const json = JSON.stringify(this.userData());
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        startDownload(url, 'user-data.json');
    }
}
