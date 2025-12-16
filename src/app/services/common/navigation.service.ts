import { Injectable } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore.service';
import { NavigationItem } from '../../models/nav.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService extends FirestoreService<NavigationItem> {
    constructor() {
        super('navigation');
    }

    getNavigation(): Observable<NavigationItem[]> {
        return this.getDocuments(orderBy('order'));
    }
}
