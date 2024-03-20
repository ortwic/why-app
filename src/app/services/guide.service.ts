import { Injectable } from '@angular/core';
import { 
  getDoc,
  CollectionReference, 
  DocumentData, 
  DocumentReference, 
  FirestoreDataConverter, 
  QueryDocumentSnapshot, 
} from '@angular/fire/firestore';
import { FirestoreService, snapshotOptions } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class GuideService extends FirestoreService {

  constructor() {
    super('guide');
  }
  
  protected override getCollection<T extends DocumentData>(): CollectionReference<T> {
    const toDocument = async (docRef: DocumentReference) => {
      const doc = await getDoc(docRef);
      return doc.data(snapshotOptions);
    };
    
    const converter: FirestoreDataConverter<T, DocumentData> = {
      toFirestore(modelObject: T): T {
        return modelObject;
      },
      fromFirestore(snapshot: QueryDocumentSnapshot<T, DocumentData>): T {
        const data = snapshot.data(snapshotOptions);
        const pages = Promise.all(data['pages']?.map(toDocument));
        return { 
          ...data,
          pages,
        };
      }
    };
    return super.getCollection<T>().withConverter(converter);
  }
}
