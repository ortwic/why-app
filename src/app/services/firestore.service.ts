import { Injectable, inject } from '@angular/core';
import {
    Firestore, 
    collection,
    collectionData, 
    query,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
    type SetOptions,
    CollectionReference,
    DocumentData,
    QueryConstraint,
    SnapshotOptions,
    DocumentReference,
} from '@angular/fire/firestore';
import { startWith } from 'rxjs/operators';
import type { Observable } from 'rxjs';

// firestore does not like undefined values so omit them
const omitUndefinedFields = (data: Record<string, unknown>) => {
  Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
          delete data[key];
      }
  });
  return data;
};

export const snapshotOptions: SnapshotOptions = {
    serverTimestamps: 'none'
};

type Data = { id: string };

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService {
  readonly store = inject(Firestore);

  constructor(private path: string) { }
  
  public getDocuments<T extends DocumentData>(...constraints: QueryConstraint[]): Observable<T[]> {
    const items = this.getCollection<T>();

    // Query requires an index, see screenshot below
    const q = query<T, DocumentData>(items, ...constraints);
    return collectionData<T>(q, { idField: 'id' }).pipe(startWith([]));
  }

  protected getCollection<T extends DocumentData>(): CollectionReference<T, DocumentData> {
      return collection(this.store, this.path) as CollectionReference<T>;
  }

  public async getDocument<T>(id: string): Promise<T | undefined> {
      const docRef = doc(this.store, this.path, id);
      return await this.toDocument(docRef) as T;
  }

  protected async toDocument<T>(docRef: DocumentReference<T, DocumentData>) {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        return snapshot.data(snapshotOptions);
    }
    
    return Promise.resolve(undefined);
  }

  public async setDocument<T extends Data>(data: T, options?: SetOptions): Promise<void> {
      const docRef = doc(this.store, this.path, data.id);
      await setDoc(docRef, omitUndefinedFields(data), options ?? {});
  }

  public async setDocuments<T extends Data>(array: T[], options?: SetOptions): Promise<void> {
      const batch = writeBatch(this.store);
      array.forEach((data) => {
          const docRef = doc(this.store, this.path, data.id);
          batch.set(docRef, omitUndefinedFields(data), options ?? {});
      });
      await batch.commit();
  }

  public async updateDocument(data: Partial<unknown>, id: string): Promise<void> {
      const docRef = doc(this.store, this.path, id);
      await updateDoc(docRef, data);
  }

  public async setDeletedFlag(id: string): Promise<void> {
      const docRef = doc(this.store, this.path, id);
      await setDoc(docRef, { deleted: new Date() });
  }

  public async removeDocument(id: string): Promise<void> {
      const docRef = doc(this.store, this.path, id);
      await deleteDoc(docRef);
  }
}
