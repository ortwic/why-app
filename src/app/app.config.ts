import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
// import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { environment as env } from '../environments/env.default';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        provideAnimationsAsync(),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(env.firebase)),
            provideAuth(() => {
                const auth = getAuth();
                if (env.useEmulators) {
                    connectAuthEmulator(auth, env.firebase['authDomain']);
                }
                return auth;
            }),
            // provideAnalytics(() => getAnalytics()),
            provideFirestore(() => {
                const store = initializeFirestore(getApp(), env.useEmulators ? {} : {
                    localCache: persistentLocalCache({
                        tabManager: persistentMultipleTabManager(),
                    }),
                })
                if (env.useEmulators) {
                    const port = env.firebase['databaseURL']?.split(':').at(-1) || 8080;
                    connectFirestoreEmulator(store, 'localhost', +port);
                }
                return store;
            }),
            provideStorage(() => {
                if (env.useEmulators) {
                    const port = env.firebase['storageBucket']?.split(':').at(-1) || 8188;
                    const storage = getStorage(undefined, env.firebase['projectId']);
                    connectStorageEmulator(storage, 'localhost', +port);
                    return storage;
                }
                return getStorage();
            }),
        ),
        // ScreenTrackingService,
        // UserTrackingService,
    ],
};
