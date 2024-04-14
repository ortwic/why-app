import { Injectable } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { Guide } from '../models/guide.model';

@Injectable({
    providedIn: 'root',
})
export class GuideService extends FirestoreService {
    readonly dataPromise = super.getDocuments<Guide>(orderBy('order'));

    constructor() {
        super('guides');
    }
}
