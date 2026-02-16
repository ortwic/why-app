import { Injectable, OnDestroy, signal } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { FirestoreService } from '../../core/firestore.service';

type L10nCode = 'en' | 'de';
type Resources = Record<string, Record<L10nCode, string>>;
type ResourceContainer = { id: string, resources: Resources };

function resourceSuffixByHour(currentHour: number): string {
    if (currentHour >= 5 && currentHour < 12) {
        return '-am';
    } else if (currentHour >= 12 && currentHour < 18) {
        return '-pm';
    } else if (currentHour >= 18 && currentHour < 21) {
        return '-lt';
    } else if (currentHour >= 21 && currentHour < 24) {
        return '-n8';
    }
    return '';
}

@Injectable({
    providedIn: 'root',
})
export class CommonService extends FirestoreService<ResourceContainer> implements OnDestroy {
    private readonly resources = signal<Record<string, Resources>>({});
    private readonly subscription: Subscription;

    constructor() {
        super('common');
        this.subscription = this.getDocuments()
            .pipe(
                map(docs => docs.reduce((acc, { id, resources }) => {
                    acc[id] = resources;
                    return acc;
                }, {} as Record<string, Resources>))
            )
            .subscribe(record => this.resources.set(record));
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    getResources(namespace: string): Resources {        
        return this.resources()[namespace] ?? {};
    }

    getResource(namespace: string, key: string): string {
        const lang = navigator.language.split('-')[0] as L10nCode ?? 'en';
        const entries = this.getResources(namespace);
        return entries[key] ? entries[key][lang] : key;
    }

    getResourceByCurrentHour(namespace: string, key: string): string {
        const suffix = resourceSuffixByHour(new Date().getHours());
        return this.getResource(namespace, `${key}${suffix}`);
    }
}
