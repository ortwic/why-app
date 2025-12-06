import { Injectable, OnDestroy, signal } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { map, Subscription } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { NavigationItem } from '../../models/nav.model';

type ResourceContainer = { id: string, resources: Record<string, unknown> };

export const currentGuideId = signal<string | undefined>(undefined);

@Injectable({
    providedIn: 'root',
})
export class CommonService implements OnDestroy {
    private readonly navStore = new FirestoreService('navigation');
    private readonly resStore = new FirestoreService('common');
    private readonly resources = signal<Record<string, Record<string, unknown>>>({});
    private readonly subscription: Subscription;

    constructor() {
        this.subscription = this.resStore.getDocuments<ResourceContainer>()
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

    async getNavigation(): Promise<NavigationItem[]> {
        return this.navStore.getDocumentsAsync<NavigationItem>(orderBy('order'));
    }

    getResources(namespace: string): Record<string, unknown> {        
        return this.resources()[namespace] ?? {};
    }

    getResource<T>(namespace: string, key: string): T {
        return this.getResources(namespace)[key] as T;
    }
}
