import { Injectable } from '@angular/core';
import { 
  getDoc,
  orderBy, 
  DocumentReference, 
  QueryDocumentSnapshot, 
} from '@angular/fire/firestore';
import { FirestoreService, snapshotOptions } from './firestore.service';
import { Guide } from '../models/guide.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService extends FirestoreService {
  readonly dataPromise = super.getDocuments<Guide>(orderBy('no'));

  constructor() {
    super('guide');
  }

  protected override fromFirestore(snapshot: QueryDocumentSnapshot) {
    const toDocument = async (docRef: DocumentReference) => {
      const doc = await getDoc(docRef);
      return doc.data(snapshotOptions);
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
    return this.dataPromise.then(guide => guide[index]?.pages ?? []);
  }
}
