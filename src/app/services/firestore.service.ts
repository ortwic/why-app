import { inject, isDevMode } from '@angular/core';
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
    docData,
} from '@angular/fire/firestore';
import { startWith } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PathBuilder } from '../utils/path-builder';

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

export abstract class FirestoreService<T extends DocumentData> {
    private readonly store = inject(Firestore);
    private readonly path: PathBuilder;

    constructor(...collectionIds: string[]) {
        this.path = new PathBuilder(collectionIds);
    }
    
    protected getDocuments(...args: Array<QueryConstraint | string>): Observable<T[]> {
        const fullPath = this.path.build(...args.filter(e => typeof e === 'string') as string[]);
        const constraints = args.filter(e => e instanceof QueryConstraint) as QueryConstraint[];
        
        const query = this.createQuery(fullPath, constraints);
        return collectionData<T>(query, { idField: 'id' }).pipe(startWith([]));
    }

    private createQuery(path: string, constraints: QueryConstraint[]): Query<T, DocumentData> {
        const items = collection(this.store, path) as CollectionReference<T>;
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
    
    protected getDocument(...docIds: string[]): Observable<T | null> {
        if (docIds.length && this.store) {
            const id = docIds.pop();
            const ref = doc(this.store, this.path.build(...docIds), id!);
            return docData(ref, { idField: 'id' }) as Observable<T | null>;
        }
        return of(null);
    }

    protected async resolveDocumentReference<T>(docRef: DocumentReference<T, DocumentData>) {
        const snapshot = await getDoc<T, DocumentData>(docRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data(snapshotOptions)
            };
        }
        
        return Promise.resolve(undefined);
    }

    public async setDocument<T extends { id: string }>(data: T, options?: SetOptions): Promise<void> {
        if (this.path.length > 1) {
            throw new Error('Support for subcollections not yet implemented');
        }

        const docRef = doc(this.store, this.path.toString(), data.id);
        await setDoc(docRef, omitUndefinedFields(data), options ?? {});
    }

    public async setDocuments<T extends { id: string }>(array: T[], options?: SetOptions): Promise<void> {
        if (this.path.length > 1) {
            throw new Error('Support for subcollections not yet implemented');
        }

        const batch = writeBatch(this.store);
        array.forEach((data) => {
            const docRef = doc(this.store, this.path.toString(), data.id);
            batch.set(docRef, omitUndefinedFields(data), options ?? {});
        });
        await batch.commit();
    }

    public async updateDocument(data: Partial<unknown>, id: string): Promise<void> {
        if (this.path.length > 1) {
            throw new Error('Support for subcollections not yet implemented');
        }

        const docRef = doc(this.store, this.path.toString(), id);
        await updateDoc(docRef, data);
    }

    public async setDeletedFlag(id: string): Promise<void> {
        if (this.path.length > 1) {
            throw new Error('Support for subcollections not yet implemented');
        }

        const docRef = doc(this.store, this.path.toString(), id);
        await setDoc(docRef, { deleted: new Date() });
    }

    public async removeDocument(id: string): Promise<void> {
        if (this.path.length > 1) {
            throw new Error('Support for subcollections not yet implemented');
        }
        
        const docRef = doc(this.store, this.path.toString(), id);
        await deleteDoc(docRef);
    }
}
