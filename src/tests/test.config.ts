import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { Auth, connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { connectFirestoreEmulator, Firestore, getFirestore, provideFirestore } from "@angular/fire/firestore";
import { connectStorageEmulator, FirebaseStorage, getStorage, provideStorage } from "@angular/fire/storage";
import { environment as env } from  '../environments/env.emulator';
import { seedData } from "./seed-data";

const currentProviders = new WeakSet<Auth | Firestore | FirebaseStorage>();
const dbPort = env.firebase['databaseURL']?.split(':').at(-1) || 8080;
const sbPort = env.firebase['storageBucket']?.split(':').at(-1) || 8188;
const bucketName = env.firebase['projectId'];

function initOnce<T extends Auth | Firestore | FirebaseStorage>(obj: T, init: (obj: T) => void) {
    if (currentProviders.has(obj)) {
        init(obj);
    }
    return obj;
}

export function firebaseProviders() {
    return [
        provideFirebaseApp(() => initializeApp(env.firebase)),
        provideAuth(() => initOnce(getAuth(), (auth) => {
            connectAuthEmulator(auth, env.firebase['authDomain']);
        })),
        provideFirestore(() => initOnce(getFirestore(getApp()), (store) => {
            connectFirestoreEmulator(store, 'localhost', +dbPort);
            seedData(store);
        })),
        provideStorage(() => initOnce(getStorage(undefined, bucketName), (storage) => {
            connectStorageEmulator(storage, 'localhost', +sbPort);
        })),
    ];
}