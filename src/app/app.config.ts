import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'reunion-e313c',
        appId: '1:123587514394:web:5fa894e84bb7b58e4341a3',
        storageBucket: 'reunion-e313c.firebasestorage.app',
        apiKey: 'AIzaSyB46ykp0UJgfS6PfHqqCUAFwoQShwFbdZk',
        authDomain: 'reunion-e313c.firebaseapp.com',
        messagingSenderId: '123587514394',
        measurementId: 'G-911N8K2TN5',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
