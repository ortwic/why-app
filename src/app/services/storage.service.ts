import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly storage = inject(Storage);

    async downloadUrl(path: string): Promise<string> {
        if (!path || path.match(/^https?:\/\//)) {
            return path;
        }
        return getDownloadURL(ref(this.storage, path));
    }
}
