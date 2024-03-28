import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { orderBy } from '@angular/fire/firestore';
import { NavigationItem } from '../models/nav.model';

type ResourceContainer = { resources: Record<string, unknown> };

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    private readonly navStore = new FirestoreService('navigation');
    private readonly resStore = new FirestoreService('common');

    constructor() {}

    async getNavigation(): Promise<NavigationItem[]> {
        return this.navStore.getDocuments<NavigationItem>(orderBy('order'));
    }

    async getResources(id: string): Promise<Record<string, unknown>> {
        return this.resStore.getDocument<ResourceContainer>(id).then((data) => (data && data.resources) || {});
    }
}
