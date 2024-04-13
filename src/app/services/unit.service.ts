import { Injectable } from '@angular/core';
import { getDoc, orderBy, DocumentReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { FirestoreService, snapshotOptions } from './firestore.service';
import { Unit } from '../models/unit.model';
import { Page } from '../models/page.model';

@Injectable({
    providedIn: 'root',
})
export class UnitService extends FirestoreService {
    readonly dataPromise = super.getDocuments<Unit>(orderBy('order'));

    constructor() {
        super('units');
    }

    protected override fromFirestore(snapshot: QueryDocumentSnapshot) {
        const toDocument = async (docRef: DocumentReference) => {
            const doc = await getDoc(docRef);
            return {
                id: doc.id,
                ...doc.data(snapshotOptions),
            };
        };

        const data = snapshot.data(snapshotOptions);
        const pageIds = data['pages'] ?? [];
        const pages = Promise.all(pageIds.map(toDocument));
        return {
            ...data,
            pages,
        };
    }

    async getPages(index: number): Promise<Page[]> {
        return this.dataPromise.then((unit) => unit[index]?.pages ?? []);
    }
}
