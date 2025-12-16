import { Injectable, OnDestroy, signal } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { FirestoreService } from '../firestore.service';

type ResourceContainer = { id: string, resources: Record<string, unknown> };

@Injectable({
    providedIn: 'root',
})
export class CommonService extends FirestoreService<ResourceContainer> implements OnDestroy {
    private readonly resources = signal<Record<string, Record<string, unknown>>>({});
    private readonly subscription: Subscription;

    constructor() {
        super('common');
        this.subscription = this.getDocuments()
            .pipe(
                map(docs => docs.reduce((acc, { id, resources }) => {
                    acc[id] = resources;
                    return acc;
                }, {} as Record<string, Record<string, unknown>>))
            )
            .subscribe(record => this.resources.set(record));
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    getResources(namespace: string): Record<string, unknown> {        
        return this.resources()[namespace] ?? {};
    }

    getResource<T>(namespace: string, key: string): T {
        return this.getResources(namespace)[key] as T;
    }
}
