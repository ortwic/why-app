import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
})
export class MediaStorageService {
    private readonly storage = inject(Storage);

    async downloadUrl(path: string): Promise<[string?, string?]> {
        if (!path || path.match(/^https?:\/\//)) {
            return [path];
        }
        try {        
            const url = await getDownloadURL(ref(this.storage, path));
            return [url];
        } catch (error: any) {
            console.warn(error.message);
            return [undefined, error.message]
        }
    }
}
