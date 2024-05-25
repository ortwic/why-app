import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
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
            provideFirebaseApp(() =>
                initializeApp({
                    projectId: 'why-app-8a640',
                    appId: '1:421607989972:web:94f09c89b215baaf3f1141',
                    storageBucket: 'why-app-8a640.appspot.com',
                    // "locationId":"europe-west",
                    apiKey: 'AIzaSyC4pJvHQFG4btucEzsw77uVT4HHovK7Nmg',
                    authDomain: 'why-app-8a640.firebaseapp.com',
                    messagingSenderId: '421607989972',
                    measurementId: 'G-1MPCGHPTJ5',
                })
            ),
            provideAuth(() => getAuth()),
            // provideAnalytics(() => getAnalytics()),
            provideFirestore(() =>
                initializeFirestore(getApp(), {
                    localCache: persistentLocalCache({
                        tabManager: persistentMultipleTabManager(),
                    }),
                })
            ),
            provideStorage(() => getStorage()),
        ),
        // ScreenTrackingService,
        // UserTrackingService,
    ],
};
