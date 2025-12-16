import { Injectable } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore.service';
import { NavigationItem } from '../../models/nav.model';

@Injectable({
    providedIn: 'root',
})
export class NavigationService extends FirestoreService<NavigationItem> {
    constructor() {
        super('navigation');
    }

    async getNavigation(): Promise<NavigationItem[]> {
        return this.getDocumentsAsync(orderBy('order'));
    }
}
