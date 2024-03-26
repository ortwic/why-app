import { Injectable, inject, isDevMode } from '@angular/core';
import {
    Firestore, 
    collection,
    collectionData, 
    query,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
    type SetOptions,
    CollectionReference,
    DocumentData,
    DocumentReference,
    Query,
    QueryConstraint,
    QueryDocumentSnapshot,
    SnapshotOptions,
    onSnapshot,
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
    
    public getDocumentStream<T extends DocumentData>(...constraints: QueryConstraint[]): Observable<T[]> {
        const query = this.createQuery<T>(...constraints);
        return collectionData<T>(query, { idField: 'id' }).pipe(startWith([]));
    }

    public async getDocuments<T extends DocumentData>(...constraints: QueryConstraint[]): Promise<T[]> {
        const query = this.createQuery<T>(...constraints);
        return getDocs<T, DocumentData>(query).then((snapshot) => {
            const result: T[] = [];
            snapshot.forEach((doc) => result.push(doc.data(snapshotOptions)));
            return result;
        });
    }

    private createQuery<T extends DocumentData>(...constraints: QueryConstraint[]): Query<T, DocumentData> {
        const items = collection(this.store, this.path).withConverter({
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore
        }) as CollectionReference<T>;
        
        const q = query<T, DocumentData>(items, ...constraints);

        if(isDevMode()) {
            onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
                const source = snapshot.metadata.fromCache ? "local cache" : "server";
                console.info("Data queried from", source);
                console.debug(snapshot.docChanges()
                    .filter((change) => change.type === "added")
                    .map((change) => (change.doc.data()))
                    .map((data) => data['title'] ?? data['id'] ?? data)
                );
            });
        }

        return q;
    }

    protected toFirestore<T>(modelObject: T) {
        return modelObject;
    }

    protected fromFirestore(snapshot: QueryDocumentSnapshot) {
        return snapshot.data(snapshotOptions);
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
